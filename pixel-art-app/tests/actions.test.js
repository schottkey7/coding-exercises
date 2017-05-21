import test from 'ava';
import R from 'ramda';

import * as actions from '../src/actions';
import * as actionTypes from '../src/constants/actionTypes';

test('addBoard action test', t => {
    const expected = {
        type: actionTypes.ADD_BOARD,
        payload: {}
    };

    t.deepEqual(actions.addBoard(), expected);
});

test('addBoard action test with extra params', t => {
    const expected = {
        type: actionTypes.ADD_BOARD,
        payload: {}
    };

    t.deepEqual(actions.addBoard(), expected);
});

test('removeBoard action test', t => {
    const payload = { name: 'test-board', i: 0 };
    const expected = {
        type: actionTypes.REMOVE_BOARD,
        payload
    };

    t.deepEqual(actions.removeBoard(payload), expected);
});

test('removeBoard action test with extra params', t => {
    const payload = {
        name: 'test-board',
        i: 0,
        more: 'somestring'
    };
    const expected = {
        type: actionTypes.REMOVE_BOARD,
        payload: R.omit(['more'], payload)
    };

    t.deepEqual(actions.removeBoard(payload), expected);
});

test('selectColor action test', t => {
    const payload = { color: '#000' };
    const expected = {
        type: actionTypes.SELECT_COLOR,
        payload
    };

    t.deepEqual(actions.selectColor(payload), expected);
});


test('toggleDragging action test', t => {
    const payload = { i: 1, on: true };
    const expected = {
        type: actionTypes.TOGGLE_DRAGGING,
        payload
    };

    t.deepEqual(actions.toggleDragging(payload), expected);
});

test('fillCell action test', t => {
    const payload = {
        i: 0,
        row: 1,
        col: 2,
        color: '#000'
    };
    const expected = {
        type: actionTypes.FILL_CELL,
        payload
    };

    t.deepEqual(actions.fillCell(payload), expected);
});

test('makeBoardActive action test', t => {
    const payload = { i: 1 };
    const expected = {
        type: actionTypes.MAKE_BOARD_ACTIVE,
        payload
    };

    t.deepEqual(actions.makeBoardActive(payload), expected);
});

test('setNewPixelSize action test', t => {
    const payload = { i: 1, size: 30 };
    const expected = {
        type: actionTypes.SET_NEW_PIXEL_SIZE,
        payload
    };

    t.deepEqual(actions.setNewPixelSize(payload), expected);
});

test('resizeBoard action test', t => {
    const payload = {
        size: 10,
        name: 'test-name',
        color: '#000'
    };
    const expected = {
        type: actionTypes.RESIZE_BOARD,
        payload
    };

    t.deepEqual(actions.resizeBoard(payload), expected);
});

test('toggleDisplayColorPicker action test', t => {
    const expected = {
        type: actionTypes.TOGGLE_DISPLAY_COLOR_PICKER,
        payload: {}
    };

    t.deepEqual(actions.toggleDisplayColorPicker(), expected);
});

test('closeColorPicker action test', t => {
    const expected = {
        type: actionTypes.CLOSE_COLOR_PICKER,
        payload: {}
    };

    t.deepEqual(actions.closeColorPicker(), expected);
});

test('setWindowSize action test', t => {
    const payload = { size: 300 };
    const expected = {
        type: actionTypes.SET_WINDOW_SIZE,
        payload
    };

    t.deepEqual(actions.setWindowSize(payload), expected);
});
