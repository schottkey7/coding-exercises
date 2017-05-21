import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { List as list } from 'immutable';

import Grid from './Grid';
import * as actions from './actions';


const Board = ({ boards, actions }) => {
    const artBoards = [];

    boards.forEach((b, i) => {
        artBoards.push(
            <Grid key={i} boardNum={i} board={b} />
        );
    });

    return <div>{artBoards}</div>;
};


Board.propTypes = {
    boards: PropTypes.instanceOf(list).isRequired,
    actions: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({
    boards: state.boards
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board);
