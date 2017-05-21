import { List as list } from 'immutable';

const initializeList = (n, val) => {
    return list(Array(n).fill(val));
};

const matrix = (n, m, val) => {
    return initializeList(n).map(() => initializeList(m, val));
};

const fillCell = (state, { i, row, col, color }) => {
    const currentBoard = state.get(i);
    const currentBoardGrid = currentBoard.get('board').setIn([row, col], color);
    return state.set(i, currentBoard.setIn(['board'], currentBoardGrid));
};

export {
    matrix,
    initializeList,
    fillCell
};
