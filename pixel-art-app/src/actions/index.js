import * as actionTypes from '../constants/actionTypes';


export const fillCell = ({ i, row, col, color }) => ({
    type: actionTypes.FILL_CELL,
    payload: { i, color, row, col }
});

export const toggleDragging = ({ i, on }) => ({
    type: actionTypes.TOGGLE_DRAGGING,
    payload: { i, on }
});

export const setNewPixelSize = ({ size, i }) => ({
    type: actionTypes.SET_NEW_PIXEL_SIZE,
    payload: { i, size }
});

export const resizeBoard = ({ size, name, color }) => ({
    type: actionTypes.RESIZE_BOARD,
    payload: { size, name, color }
});
