# coding=utf-8
"""Tests for the tcp echo server."""
import socket
import unittest
from collections import defaultdict
import os


class TestEchoServer(unittest.TestCase):

    """Run multiple tests."""

    def test_empty_string(self):
        """Test empty string."""
        tester = EchoServerTester(0)
        messages_to_send = [
            ""
        ]
        tester.send_msgs(messages_to_send)
        responses = tester.receive_msgs(messages_to_send)
        for response in responses.values():
            self.assertEqual(response, "")
        tester.close_connections()

    def test_long_string_without_newline(self):
        """Test sending a string without a newline."""
        tester = EchoServerTester(0)
        messages_to_send = [
            "This is a long string to send. It should be ignored.",
            "This one too"
        ]
        tester.send_msgs(messages_to_send)
        responses = tester.receive_msgs(messages_to_send)
        for response in responses.values():
            self.assertEqual(response, "")
        tester.close_connections()

    def test_string_with_newline_nonblocking(self):
        """Test sending a string with a newline."""
        tester = EchoServerTester(0)
        string_to_send = "This string should be returned\n"
        messages_to_send = [
            string_to_send
        ]
        tester.send_msgs(messages_to_send)
        responses = tester.receive_msgs(messages_to_send)
        for response in responses.values():
            self.assertEqual(response, string_to_send)
        tester.close_connections()

    def test_sending_a_newlines(self):
        """Test sending just a newline."""
        tester = EchoServerTester()
        string_to_send = "\n\n\n\n\n\n"
        messages_to_send = [
            string_to_send
        ]
        tester.send_msgs(messages_to_send)
        responses = tester.receive_msgs(messages_to_send)
        for response in responses.values():
            self.assertEqual(response, string_to_send)
        tester.close_connections()

    def test_msg_with_newline(self):
        """Test sending a message that ends with a newline."""
        tester = EchoServerTester()
        sring_to_send = "First message\n"
        messages_to_send = [
            sring_to_send
        ]
        tester.send_msgs(messages_to_send)
        responses = tester.receive_msgs(messages_to_send)
        for response in responses.values():
            self.assertEqual(response, sring_to_send)
        tester.close_connections()

    def test_separate_msgs_ending_in_newline(self):
        """
        Test sending a message that doesn't end with with
        a newline first, followed by a message that ends
        with a newline
        """
        tester = EchoServerTester()
        messages_to_send = [
            "First message."
            "Second message\n"
        ]
        tester.send_msgs(messages_to_send)
        responses = tester.receive_msgs(messages_to_send)
        for response in responses.values():
            self.assertEqual(response, "First message.Second message\n")
        tester.close_connections()

    def test_mixed(self):
        """Test mixed."""
        tester = EchoServerTester()
        messages_to_send = [
            "First message\n",
            "More msgs to send."
        ]
        tester.send_msgs(messages_to_send)
        responses = tester.receive_msgs(messages_to_send)
        for response in responses.values():
            self.assertEqual(response, "First message\n")
        tester.close_connections()

    def test_multiple_newlines(self):
        """Test multiple newlines."""
        tester = EchoServerTester()
        messages_to_send = [
            "First message\n",
            "Second msg.\n",
            "\nThird message.\n",
            "Final\nmessage."
        ]
        tester.send_msgs(messages_to_send)
        responses = tester.receive_msgs(messages_to_send)
        for response in responses.values():
            self.assertEqual(
                response,
                "First message\nSecond msg.\n\nThird message.\nFinal\n"
            )
        tester.close_connections()

    def test_long_string(self):
        """Test sending a long message."""
        tester = EchoServerTester()
        string_to_send = """
            The process is begun by dividing the left-most digit of the
            dividend by the divisor. The quotient (rounded down to an integer)
            becomes the first digit of the result, and the remainder is
            calculated (this step is notated as a subtraction). This
            remainder carries forward when the process is repeated on
            the following digit of the dividend (notated as 'bringing down'
            the next digit to the remainder). When all digits have been
            processed and no remainder is left, the process is complete.\n"""
        messages_to_send = [
            string_to_send
        ]
        tester.send_msgs(messages_to_send)
        responses = tester.receive_msgs(messages_to_send)
        for response in responses.values():
            self.assertEqual(response, string_to_send)
        tester.close_connections()


class EchoServerTester(object):

    """
    Simple echo server.

    :int : blocking
    """

    def __init__(self, blocking=1):
        self.host = 'localhost'
        self.port = 9001
        self.server_address = (self.host, self.port)
        # Number of "simultaneous" connections
        self.connections = 15
        self.blocking = blocking
        # Bytes to receive at once
        self.bytes_to_receive = 16
        self.sockets = [
            socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            for _ in range(self.connections)
        ]

        for sock in self.sockets:
            sock.connect(self.server_address)
            sock.setblocking(self.blocking)

    def send_msgs(self, msgs):
        """Send all messages to all sockets."""
        for msg in msgs:
            # Send all messages on all sockets
            for sock in self.sockets:
                sock.send(bytes(msg.encode('utf-8')))

    @staticmethod
    def find_expected_msg_length(msgs):
        """Find the expected length of the returned msgs."""
        all_msgs = ''.join(msgs)
        length = len(all_msgs)
        last_newline = all_msgs[::-1].find(os.linesep)
        if last_newline >= 0:
            return length - last_newline
        else:
            return 0

    def receive_msgs(self, msgs):
        """Read responses on all sockets."""
        responses = defaultdict(str)
        length_expected = self.find_expected_msg_length(msgs)
        for sock in self.sockets:
            client = ':'.join([str(i) for i in sock.getsockname()])
            try:
                length_received = 0
                while length_received < length_expected:
                    data = sock.recv(self.bytes_to_receive)
                    if data:
                        responses[client] += data.decode('utf-8')
                        length_received += len(data)
                    else:
                        break
            except socket.error as err:
                if err.errno in [11, 35]:
                    # In the case blocking is set to False, catch
                    # "resource temporarily unavailable" error
                    pass
                else:
                    print("Uncaught error", err)
        return responses

    def close_connections(self):
        """Close existing connections."""
        for sock in self.sockets:
            sock.close()


if __name__ == '__main__':
    unittest.main()
