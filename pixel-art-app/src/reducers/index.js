import { combineReducers } from 'redux';

import boards from './boards';
import grid from './grid';

const App = combineReducers({
    boards,
    grid
});


export default App;
