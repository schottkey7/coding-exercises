import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './components/App';
import reducer from './reducers';
import { initialState } from './constants';

const store = createStore(reducer, initialState);

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <Route path="/*" component={App} />
            </Router>
        </Provider>,
        document.getElementById('root')
    );
};


render();
store.subscribe(render);
