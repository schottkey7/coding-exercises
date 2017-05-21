import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Cell from './Cell';
import * as actions from './actions';


const Grid = ({ actions, board, boardNum }) => {
    const styles = {
        borderLeft: 'solid 1px #dcdcdc',
        borderTop: 'solid 1px #dcdcdc',
        height: '100%',
        width: `600px`,
        lineHeight: '0em'
    };

    return (
        <div className="ui segment"
             style={{ width: "100%", height: "100%" }}
             onMouseUp={() => actions.toggleDragging({ i: boardNum, on: false })}
             onMouseDown={() => actions.toggleDragging({ i: boardNum, on: true })}>
             <div style={styles}>
                { board.get('board').map((row, i) => row.map((el, j) =>
                    (<Cell board={board} i={boardNum} row={i} col={j} />)
                ))}
            </div>
        </div>
    );
};

Grid.propTypes = {
    actions: PropTypes.object.isRequired,
    boardNum: PropTypes.number.isRequired,
    board: PropTypes.object.isRequired
};


const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});


export default connect(
    undefined,
    mapDispatchToProps
)(Grid);
