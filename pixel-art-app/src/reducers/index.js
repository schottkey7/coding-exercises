import { combineReducers } from 'redux';

import boards from './boards';
import grid from './grid';
import palette from './palette';
import navigation from './navigation';

const App = combineReducers({
    boards,
    grid,
    palette,
    navigation
});


export default App;
