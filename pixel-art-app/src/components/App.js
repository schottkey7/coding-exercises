import React from 'react';
import { head } from 'ramda';
import PropTypes from 'prop-types';

import Board from '../containers/Board';
import Palette from '../containers/Palette';
import Navigation from '../containers/Navigation';

// eslint-disable-next-line react/prop-types
const App = ({ match }) => {
    const linkedBoardName = head(match.params);

    return (
        <div className="ui container">
            <br />
            <h1 className="ui dividing header">PIXEL ART</h1>
            <p className="first">Simple app that lets you draw in a grid of pixels. Enjoy! :]</p>
            <Palette />
            <Navigation linkedBoardName={linkedBoardName}/>
            <Board linkedBoardName={linkedBoardName}/>
        </div>
    );
};

App.PropTypes = {
    match: PropTypes.string
};


export default App;
