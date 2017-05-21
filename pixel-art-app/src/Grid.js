import React from 'react';
import PropTypes from 'prop-types';
import { List as list } from 'immutable';

import Cell from './Cell.jsx';


const Grid = ({ board, boardNum }) => {
    const styles = {
        borderLeft: 'solid 1px #dcdcdc',
        borderTop: 'solid 1px #dcdcdc',
        height: '100%',
        width: `600px`,
        lineHeight: '0em'
    };

    return (
        <div className="ui segment" style={{ width: "100%", height: "100%" }}>
             <div style={styles}>
                { board.map((row, i) => row.map((el, j) =>
                    (<Cell board={board} i={boardNum} row={i} col={j} />)
                ))}
            </div>
        </div>
    );
};

Grid.propTypes = {
    board: PropTypes.instanceOf(list).isRequired,
    boardNum: PropTypes.number.isRequired
};


export default Grid;
