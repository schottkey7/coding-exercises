import { List as list, Map as map } from 'immutable';

import { matrix } from '../utils';

const defaultCellColor = '#fbfbfb';
const defaultGridSize = 20;
const defaultPixelSize = Math.floor(1000 / defaultGridSize);

const initialState = {

    boards: list([map({
        isDragOn: false,
        pixelSize: defaultPixelSize,
        board: matrix(
            defaultGridSize,
            defaultGridSize,
            defaultCellColor
        )
    })]),
    grid: {
        size: defaultGridSize,
        defaultColor: defaultCellColor
    }
};


export {
    initialState
};
