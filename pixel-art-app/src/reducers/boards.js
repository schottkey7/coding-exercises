import { List as list } from 'immutable';

import { fillCell, modifyBoard } from '../utils';
import { FILL_CELL, TOGGLE_DRAGGING } from '../constants/actionTypes';


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
        default:
            return state;
    }
};

export default boards;
