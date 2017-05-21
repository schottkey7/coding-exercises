import { SET_WINDOW_SIZE } from '../constants/actionTypes';

const grid = (state = {}, action) => {
    switch (action.type) {
        case SET_WINDOW_SIZE:
            return Object.assign({}, state, { windowSize: action.payload.size })
        default:
            return state;
    }
};

export default grid;
