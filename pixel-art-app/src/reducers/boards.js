import shortid from 'shortid';
import { Map as map, List as list, fromJS } from 'immutable';

import { fillCell, modifyBoard, resizeBoard, matrix } from '../utils';
import { defaultCellColor, defaultGridSize, defaultPixelSize } from '../constants';
import {
    FILL_CELL,
    TOGGLE_DRAGGING,
    SET_NEW_PIXEL_SIZE,
    RESIZE_BOARD,
    ADD_BOARD,
    REMOVE_BOARD,
    MAKE_BOARD_ACTIVE
} from '../constants/actionTypes';


const boards = (state = list(), action) => {
    // convert to Immutable due to localstorage returning state as an array
    if (state.constructor.name === 'Array') {
        state = fromJS(state);
    }
    switch (action.type) {
        case ADD_BOARD:
            return state
                .map(b => b.set('active', false))
                .push(map({
                    name: shortid.generate(),
                    active: true,
                    isDragOn: false,
                    pixelSize: defaultPixelSize,
                    board: matrix(defaultGridSize, defaultGridSize, defaultCellColor)
                }));
        case REMOVE_BOARD:
            if (typeof action.payload.i !== 'undefined') {
                return state.delete(action.payload.i);
            } else if (typeof action.payload.name !== 'undefined') {
                return state.filter(b => b.get('name') !== action.payload.name);
            }
            return state;
        case MAKE_BOARD_ACTIVE:
            if (state.size > 0) {
                return modifyBoard(state, {
                    i: action.payload.i,
                    key: 'active',
                    val: true
                });
            }
            return state;
        case FILL_CELL:
            return fillCell(state, action.payload);
        case TOGGLE_DRAGGING:
            return modifyBoard(state, {
                i: action.payload.i,
                key: 'isDragOn',
                val: action.payload.on
            });
        case SET_NEW_PIXEL_SIZE:
            return modifyBoard(state, {
                i: action.payload.i,
                key: 'pixelSize',
                val: action.payload.size
            });
        case RESIZE_BOARD:
            if (typeof action.payload.size !== 'undefined') {
                return state.map(
                    b => b.get('name') === action.payload.name ?
                    resizeBoard(b, action.payload) : b);
            }
            return state;
        default:
            return state;
    }
};

export default boards;
