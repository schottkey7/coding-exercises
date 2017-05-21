import test from 'ava';
import { List as list, Map as map, fromJS } from 'immutable';

import * as utils from '../src/utils';

test('initializeList test', t => {
    const expected = list([1, 1, 1]);
    t.deepEqual(utils.initializeList(3, 1), expected);
});

test('matrix test', t => {
    const expected = list([list([1, 1, 1]), list([1, 1, 1])]);
    t.deepEqual(utils.matrix(2, 3, 1), expected);
});

test('filLCell test', t => {
    const initialState = list([map({
        isDragOn: false,
        name: 'default',
        pixelSize: 30,
        active: true,
        board: list([
            list(['#000', '#000', '#000']),
            list(['#000', '#000', '#000']),
            list(['#000', '#000', '#000'])
        ])
    })]);

    const expectedState = list([map({
        isDragOn: false,
        name: 'default',
        pixelSize: 30,
        active: true,
        board: list([
            list(['#000', '#000', '#000']),
            list(['#000', '#FFF', '#000']),
            list(['#000', '#000', '#000'])
        ])
    })]);

    const payload = {
        i: 0,
        row: 1,
        col: 1,
        color: '#FFF'
    };

    const updatedState = utils.fillCell(initialState, payload);
    t.deepEqual(updatedState.toJS(), expectedState.toJS());
});

test('modifyBoard test', t => {
    const initialState = list([map({
        isDragOn: false,
        name: 'default',
        pixelSize: 30,
        active: true,
        board: list()
    })]);

    const expectedState = list([map({
        isDragOn: true,
        name: 'default',
        pixelSize: 30,
        active: true,
        board: list()
    })]);

    const payload = {
        i: 0,
        key: 'isDragOn',
        val: true
    };

    const updatedState = utils.modifyBoard(initialState, payload);
    t.deepEqual(updatedState.toJS(), expectedState.toJS());
});


test('extendBoard test', t => {
    const initialBoard = list([
        list(['#000', '#000']),
        list(['#000', '#000'])
    ]);

    const expectedBoard = list([
        list(['#000', '#000', '#FFF']),
        list(['#000', '#000', '#FFF']),
        list(['#FFF', '#FFF', '#FFF'])
    ]);

    const updatedBoard = utils.extendBoard(initialBoard, 3, '#FFF');
    t.deepEqual(updatedBoard.toJS(), expectedBoard.toJS());
});

test('resizeBoard test (smaller)', t => {
    const initialState = map({
        isDragOn: true,
        name: 'test',
        pixelSize: 30,
        active: true,
        board: list([
            list(['#000', '#000', '#000']),
            list(['#000', '#000', '#000']),
            list(['#000', '#000', '#000'])
        ])
    });

    const expectedState = map({
        isDragOn: true,
        name: 'test',
        pixelSize: 30,
        active: true,
        board: list([
            list(['#000', '#000']),
            list(['#000', '#000'])
        ])
    });

    const payload = {
        color: '#FFF',
        name: 'test',
        size: 2
    };

    const updatedState = utils.resizeBoard(initialState, payload);
    t.deepEqual(updatedState.toJS(), expectedState.toJS());
});

test('resizeBoard test (bigger)', t => {
    const initialState = map({
        isDragOn: true,
        name: 'test',
        pixelSize: 30,
        active: true,
        board: list([
            list(['#000', '#000']),
            list(['#000', '#FFF'])
        ])
    });

    const expectedState = map({
        isDragOn: true,
        name: 'test',
        pixelSize: 30,
        active: true,
        board: list([
            list(['#000', '#000', '#FFF']),
            list(['#000', '#FFF', '#FFF']),
            list(['#FFF', '#FFF', '#FFF'])
        ])
    });

    const payload = {
        color: '#FFF',
        name: 'test',
        size: 3
    };

    const updatedState = utils.resizeBoard(initialState, payload);
    t.deepEqual(updatedState.toJS(), expectedState.toJS());
});


test('resizeBoard test (same)', t => {
    const initialState = map({
        isDragOn: true,
        name: 'test',
        pixelSize: 30,
        active: true,
        board: list([
            list(['#000', '#000']),
            list(['#000', '#000'])
        ])
    });

    const payload = {
        color: '#FFF',
        name: 'test',
        size: 2
    };

    const updatedState = utils.resizeBoard(initialState, payload);
    t.deepEqual(updatedState.toJS(), initialState.toJS());
});

test('resizeBoard test (>100 size)', t => {
    const initialState = map({
        isDragOn: true,
        name: 'test',
        pixelSize: 30,
        active: true,
        board: list([
            list(['#000', '#000']),
            list(['#000', '#FFF'])
        ])
    });

    const payload = {
        color: '#FFF',
        name: 'test',
        size: 101
    };

    const updatedState = utils.resizeBoard(initialState, payload);
    t.deepEqual(updatedState.toJS(), initialState.toJS());
});


test('getRandomColor test (hex)', t => {
    const color = utils.getRandomColor();
    const regex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    t.regex(color, regex, 'not a valid hex color');
});


test('keyValPairInListOfObjects test', t => {
    const lst = fromJS([
        { name: 'a', size: 2 },
        { name: 'b', size: 5, color: '#FFF' }
    ]);

    t.true(utils.keyValPairInListOfObjects(lst, 'name', 'a'));
    t.false(utils.keyValPairInListOfObjects(lst, 'name', 'x'));
    t.false(utils.keyValPairInListOfObjects(lst, 'x', 'a'));
});
