import { List as list, Map as map } from 'immutable';

import { matrix } from '../utils';


const defaultGridSize = 20;
const defaultCellColor = '#fbfbfb';

const initialState = {

    boards: list([map({
        isDragOn: false,
        board: matrix(
            defaultGridSize,
            defaultGridSize,
            defaultCellColor
        )
    })])
};


export {
    initialState
};
