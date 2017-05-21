import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { List as list } from 'immutable';

import Grid from './Grid';
import * as actions from '../actions';
import { keyValPairInListOfObjects } from '../utils';


const Board = ({ boards, linkedBoardName }) => {
    let activeBoardName = boards.size ? boards.filter(b => b.get('active')).getIn([0, 'name']) : null;
    const artBoards = [];

    if (linkedBoardName && keyValPairInListOfObjects(boards, 'name', linkedBoardName)) {
        activeBoardName = linkedBoardName;
    }

    boards.forEach((b, i) => {
        if (b.get('name') === activeBoardName) {
            artBoards.push(<Grid key={i} boardNum={i} board={b} />);
        }
    });

    return <div>{artBoards}</div>;
};


Board.propTypes = {
    boards: PropTypes.instanceOf(list).isRequired,
    actions: PropTypes.object.isRequired,
    linkedBoardName: PropTypes.string
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
