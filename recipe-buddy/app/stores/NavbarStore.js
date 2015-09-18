import alt from '../alt';
import NavbarActions from '../actions/NavbarActions';
import HomeActions from '../actions/HomeActions';

class NavbarStore {
  constructor() {
    this.bindActions(NavbarActions);
    // the search term typed in the the search box
    this.searchQuery = '';
    // is the "Only show starred" button checked
    this.starredChecked = false;
    /*
     *  I've set items per page to 9 because the columns
     *  per page are 3 and it looks better
    */
    this.itemsPerPage = 9;
  }

  // update the search term to the most recent value
  onUpdateSearchQuery(event) {
    this.searchQuery = event.target.value;
  }

  // clear search term from the search box
  onClearSearchTerm() {
    this.searchQuery = '';
  }

  // toggle starred checkbox
  onHandleCheckBox() {
    this.starredChecked = !this.starredChecked;
  }
}

export default alt.createStore(NavbarStore);
