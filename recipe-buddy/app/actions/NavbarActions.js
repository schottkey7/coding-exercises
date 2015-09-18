import alt from '../alt';
import {assign} from 'underscore';

class NavbarActions {
  constructor() {
    this.generateActions(
      'updateSearchQuery',
      'clearSearchTerm',
      'handleCheckBox'
    );
  }
}

export default alt.createActions(NavbarActions);
