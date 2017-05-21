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

const modifyBoard = (state, { i, key, val }) => {
    return state.set(i, state.get(i).set(key, val));
};

const extendBoard = (boardGrid, size, color) => {
    const diff = size - boardGrid.size;

    return boardGrid
            .map(r => r.concat(initializeList(diff, color)))
            .concat(matrix(diff, size, color));
};

const resizeBoard = (board, { name, size, color }) => {
    const boardGrid = board.get('board');

    if (size <= 100) {
        if (size < boardGrid.size) {
            const grid = boardGrid.setSize(size).map(a => a.setSize(size));
            return board.set('board', grid);
        } else if (size > boardGrid.size) {
            return board.set('board', extendBoard(boardGrid, size, color));
        } else return board;
    }
    return board;
};

export {
    matrix,
    initializeList,
    fillCell,
    modifyBoard,
    resizeBoard
};
