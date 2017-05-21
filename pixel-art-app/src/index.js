import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { List as list, Map as map } from 'immutable';

import App from './App';
import reducer from './reducers';
import { matrix } from './utils';
import './index.css';


const initialState = {
    boards: list([map({
        board: matrix(30, 30, '#000')
    })])
};

const store = createStore(reducer, initialState);

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
};


render();
store.subscribe(render);
