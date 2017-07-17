import { List as list } from 'immutable';


const matrix = (n, m, val) => {
    return initializeList(n).map(() => initializeList(m, val));
};

const fillCell = (state, { i, row, col, color }) => {
    const currentBoard = state.get(i);
    const currentBoardGrid = currentBoard.get('board').setIn([row, col], color);
    return state.set(i, currentBoard.setIn(['board'], currentBoardGrid));
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
        }
        return board;
    }
    return board;
};

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export {
    matrix,
    initializeList,
    fillCell,
    modifyBoard,
    resizeBoard,
    getRandomColor,
    keyValPairInListOfObjects,
    extendBoard
};
