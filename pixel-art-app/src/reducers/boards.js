import { List as list } from 'immutable';

import { fillCell, modifyBoard, resizeBoard } from '../utils';
import {
    FILL_CELL,
    TOGGLE_DRAGGING,
    SET_NEW_PIXEL_SIZE,
    RESIZE_BOARD
} from '../constants/actionTypes';


const boards = (state = list(), action) => {
    switch (action.type) {
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
