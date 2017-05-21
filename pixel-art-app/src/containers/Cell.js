import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map as map } from 'immutable';

import * as actions from '../actions';

const Cell = ({ actions, palette, grid, board, i, row, col }) => {
    const pixelSize = board.get('pixelSize');
    const { selectedColor } = palette;
    const styles = {
        display: 'inline-block',
        verticalAlign: 'top',
        borderRight: 'solid 1px #dcdcdc',
        borderBottom: 'solid 1px #dcdcdc',
        width: `${pixelSize}px`,
        height: `${pixelSize}px`,
        backgroundColor: board.get('board').getIn([row, col]),
        cursor: board.get('isDragOn') ? 'pointer' : 'auto',
        lineHeight: 'inherit'
    };

    const handleMouseOver = () => {
        if (board.get('isDragOn')) {
            return actions.fillCell({ i, row, col, color: selectedColor });
        }
    };

    const handleClick = () => {
        let color = palette.selectedColor;
        const cellColor = board.getIn(['board', row, col]);

        if (color === cellColor) {
            color = grid.defaultColor;
        }

        return actions.fillCell({ i, row, col, color: selectedColor });
    };

    return (
        <div key={`${i}-${row}-${col}`}
             style={styles}
             onClick={handleClick}
             onMouseOver={handleMouseOver}
             onTouchMove={handleMouseOver} />
    );
};


Cell.propTypes = {
    i: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    board: PropTypes.instanceOf(map).isRequired,
    actions: PropTypes.object.isRequired,
    grid: PropTypes.object.isRequired,
    palette: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    palette: state.palette,
    grid: state.grid
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cell);
