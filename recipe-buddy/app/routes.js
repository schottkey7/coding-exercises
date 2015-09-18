import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Recipe from './components/Recipe';

// define routes
export default (
  <Route handler={App}>
    <Route path='/' handler={Home} />
    <Route path='/recipe/:id' handler={Recipe} />
  </Route>
);
