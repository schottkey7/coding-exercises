import R from 'ramda';
import { List as list, Map as map } from 'immutable';

import { matrix, getRandomColor } from '../utils';

const defaultNuMPaletteColors = 42;
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
    },
    palette: {
        numColors: defaultNuMPaletteColors,
        size: 30,
        defaultSelectedColor: '#000',
        selectedColor: '#000',
        colors: R.map(getRandomColor, Array(defaultNuMPaletteColors)),
        displayColorPicker: false
    }
};


export {
    initialState
};
