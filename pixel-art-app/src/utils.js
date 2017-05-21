import { List as list } from 'immutable';

const initializeList = (n, val) => {
    return list(Array(n).fill(val));
};

const matrix = (n, m, val) => {
    return initializeList(n).map(() => initializeList(m, val));
};


export {
    matrix,
    initializeList
};
