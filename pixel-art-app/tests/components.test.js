import test from 'ava';
import React from 'react';
import { renderJSX, JSX as jsx } from 'jsx-test-helpers';
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme';


import App from '../src/components/App';
import Palette from '../src/containers/Palette';
import Navigation from '../src/containers/Navigation';
import Board from '../src/containers/Board';
import ColorPickerButton from '../src/containers/ColorPickerButton';
import { initialState } from '../src/constants';

const mockStore = configureStore();

test('renders correct markup for App', t => {
    const match = { params: "" };
    const actual = renderJSX(<App match={match}/>);
    const expected = jsx(
        <div className="ui container">
            <br/>
            <h1 className="ui dividing header">PIXEL ART</h1>
            <p className="first">Simple app that lets you draw in a grid of pixels. Enjoy! :]</p>
            <Palette/>
            <Navigation linkedBoardName=""/>
            <Board linkedBoardName=""/>
        </div>
    );
    t.is(actual, expected);
});


test('renders Navigation', t => {
    const store = mockStore(initialState);
    const wrapper = shallow(
        <Navigation store={store}>
            <div className="unique"/>
        </Navigation>
    );
    t.true(wrapper.contains(<div className="unique"/>));
});

test('renders ColorPickerButton', t => {
    const store = mockStore(initialState);
    const wrapper = shallow(
        <ColorPickerButton store={store}>
            <div className="unique"/>
        </ColorPickerButton>
    );
    t.true(wrapper.contains(<div className="unique"/>));
});


// TODO: add more tests
