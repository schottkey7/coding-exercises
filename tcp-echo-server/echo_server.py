"""
Non-blocking echo server that handles multiple connections simultaneously
"""
import select
import socket
import os


class EchoServer(object):

    """ Create a non-blocking tcp echo server. """

    def __init__(self):
        # Create a tcp/ip socket
        self.server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.host = 'localhost'
        self.port = 9001
        # Select an arbitrary non-standard port the server should bind to
        self.server_address = (self.host, self.port)
        # Number of unaccepted connections that the server will allow
        # before refusing new ones
        self.backlog = 10
        # Readable sockets
        self.inputs = [self.server]
        # Writable sockets
        self.outputs = []
        # Queue for outgoing messages
        self.messages = {}
        self.bytes_to_receive = 1024
        # Set blocking to false, bind to server address
        # and listen for incoming connections
        self.server.setblocking(0)
        self.server.bind(self.server_address)
        self.server.listen(self.backlog)

    def remove_connection(self, readable_input, client):
        """ Remove connection. """
        if readable_input in self.outputs:
            self.outputs.remove(readable_input)
        self.inputs.remove(readable_input)
        readable_input.close()
        del self.messages[client]

    def handle_inputs(self, rlist):
        """ Process inputs by iterating over all received inputs. """
        for readable_input in rlist:
            if readable_input is self.server:
                # If there is a new connection, accept it
                conn, client_ip = readable_input.accept()
                # Set connection to non-blocking
                conn.setblocking(0)
                client = "{}:{}".format(client_ip[0], client_ip[1])

                print("[>] New incoming connection from {}".format(client))

                # Append connection to available inputs
                self.inputs.append(conn)

                # Create a message queue for the connection
                self.messages[client] = b''
            else:
                try:
                    client = ':'.join([str(i) for i in readable_input.getpeername()])
                    data = readable_input.recv(self.bytes_to_receive)
                    # If there isn't any data or the connection was manually closed with ctrl+c
                    if data and data != b'\xff\xf4\xff\xfd\x06':
                        # If there is read data, add it to the message queue
                        self.messages[client] += data
                        # Add an output channel for sending replies
                        if readable_input not in self.outputs:
                            self.outputs.append(readable_input)
                    else:
                        # If no data is received, close the connection
                        print("[x] Closing connection from {}".format(client))
                        self.remove_connection(readable_input, client)

                except socket.error as err:
                    if err.errno == 104:
                        # Connetion reset by peer, remove connection
                        self.remove_connection(readable_input, client)

    def handle_outputs(self, wlist):
        """ Process outputs by iterating over all available channels."""
        for output in wlist:
            try:
                client = ':'.join([str(i) for i in output.getpeername()])
                length_of_msg = len(self.messages[client])
                if length_of_msg:
                    message_to_send = self.messages[client].decode('utf-8')
                    last_newline = message_to_send[::-1].find(os.linesep)
                    if last_newline >= 0:
                        output.send(bytes(
                            message_to_send[:length_of_msg - last_newline]
                            .encode('utf-8'))
                        )
                        self.messages[client] = bytes(
                            message_to_send[length_of_msg - last_newline:]
                            .encode('utf-8')
                        )
                    elif last_newline == 0:
                        output.send(self.messages[client])
                        self.messages[client] = b''
                else:
                    # No messages left to send
                    self.outputs.remove(output)
            except socket.error as err:
                if err.errno == 9:
                    # Trying to write to a closed connection, silently decline
                    pass

    def handle_exceptions(self, exceptions):
        """ Handle exceptions """
        for exception in exceptions:
            client = ':'.join([str(i) for i in exception.getpeername()])
            print("[!] Exception triggered by {}".format(client))
            self.inputs.remove(exception)
            for exception in self.outputs:
                self.outputs.remove(exception)
            exception.close()
            del self.messages[client]

    def run(self):
        """ Run the server """
        try:
            print("Starting server on port {}".format(self.port))
            while self.inputs:
                rlist, wlist, exceptions = select.select(
                    self.inputs,
                    self.outputs,
                    self.inputs
                )
                self.handle_inputs(rlist)
                self.handle_outputs(wlist)
                self.handle_exceptions(exceptions)
        except KeyboardInterrupt:
            print("Quitting...")


if __name__ == '__main__':
    EchoServer().run()
