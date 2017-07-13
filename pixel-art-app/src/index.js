import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';

import App from './components/App';
import reducer from './reducers';
import { initialState } from './src/constants';

const enchancer = compose(persistState());
const store = createStore(reducer, initialState, enchancer);

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
