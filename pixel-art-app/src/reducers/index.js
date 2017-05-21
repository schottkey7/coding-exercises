import { combineReducers } from 'redux';
import { List as list } from 'immutable';


const App = combineReducers({
    boards: (state = list()) => state
});


export default App
