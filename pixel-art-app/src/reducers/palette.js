import { merge } from 'ramda';

import {
    SELECT_COLOR,
    CLOSE_COLOR_PICKER,
    TOGGLE_DISPLAY_COLOR_PICKER
} from '../constants/actionTypes';

const palette = (state = {}, action) => {
    switch (action.type) {
        case SELECT_COLOR:
            return merge(state, { selectedColor: action.payload.color });
        case TOGGLE_DISPLAY_COLOR_PICKER:
            return merge(state, { displayColorPicker: !state.displayColorPicker });
        case CLOSE_COLOR_PICKER:
            return merge(state, { displayColorPicker: false });
        default:
            return state;
    }
};

export default palette;
