import { combineReducers } from 'redux';

import boards from './boards';
import grid from './grid';
import palette from './palette';

const App = combineReducers({
    boards,
    grid,
    palette
});


export default App;
