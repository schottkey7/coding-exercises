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

export const toggleDisplayColorPicker = () => ({
    type: actionTypes.TOGGLE_DISPLAY_COLOR_PICKER,
    payload: {}
});

export const closeColorPicker = () => ({
    type: actionTypes.CLOSE_COLOR_PICKER,
    payload: {}
});

export const selectColor = ({ color }) => ({
    type: actionTypes.SELECT_COLOR,
    payload: { color }
});

export const setWindowSize = ({ size }) => ({
    type: actionTypes.SET_WINDOW_SIZE,
    payload: { size }
});

export const addBoard = () => ({
    type: actionTypes.ADD_BOARD,
    payload: {}
});

export const removeBoard = ({ name, i }) => ({
    type: actionTypes.REMOVE_BOARD,
    payload: { i, name }
});

export const makeBoardActive = ({ i }) => ({
    type: actionTypes.MAKE_BOARD_ACTIVE,
    payload: { i }
});
