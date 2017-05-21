import * as actionTypes from '../constants/actionTypes';


export const fillCell = ({ i, row, col, color }) => ({
    type: actionTypes.FILL_CELL,
    payload: { i, color, row, col }
});

export const toggleDragging = ({ i, on }) => ({
    type: actionTypes.TOGGLE_DRAGGING,
    payload: { i, on }
});
