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
        name: 'default',
        active: true,
        pixelSize: defaultPixelSize,
        board: matrix(
            defaultGridSize,
            defaultGridSize,
            defaultCellColor
        )
    })]),
    grid: {
        defaultColor: defaultCellColor,
        windowSize: window.innerWidth
    },
    navigation: {
        maxBoards: 7
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

const numToWordMapping = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten'
};


export {
    initialState,
    numToWordMapping,
    defaultCellColor,
    defaultGridSize,
    defaultPixelSize
};
