import React from 'react';
import PropTypes from 'prop-types';
import { List as list } from 'immutable';


const Cell = ({ board, i, row, col }) => {
    const styles = {
        display: 'inline-block',
        verticalAlign: 'top',
        borderRight: 'solid 1px #dcdcdc',
        borderBottom: 'solid 1px #dcdcdc',
        width: `30px`,
        height: `30px`,
        backgroundColor: board.get([row, col]),
        lineHeight: 'inherit'
    };

    return (
        <div key={`${i}-${row}-${col}`}
             style={styles} />
    );
};


Cell.propTypes = {
    i: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    board: PropTypes.instanceOf(list).isRequired
};

export default Cell;
