import React from 'react';

import Board from '../containers/Board';
import Palette from '../containers/Palette';

const App = () => {
    return (
        <div className="ui container">
            <h1 className="ui dividing header">PIXEL ART</h1>
            <p className="first">Simple app that lets you draw in a grid of pixels. Enjoy! :]</p>
            <Palette />
            <Board />
        </div>
    );
};


export default App;
