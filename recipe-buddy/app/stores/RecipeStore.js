import {assign, contains} from 'underscore';
import alt from '../alt';
import RecipeActions from '../actions/RecipeActions';

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};


class RecipeStore {
  constructor() {
    this.bindActions(RecipeActions);
  }

  onGetRecipeSuccess(data) {
    assign(this, data);
  }

  onGetCharacterFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  // if a recipe is starred, store its ID in localStorage
  // else remove its ID from localStorage
  onStarItem(event) {
    let recipeId = event[0],
        starredItems = localStorage.getItem('starred'),
        starredStatus = true;

    if (starredItems) {
      starredItems = starredItems.split(',');
      let indx = starredItems.indexOf(recipeId);
      if (indx >= 0) {
        starredStatus = false;
        starredItems.remove(indx);
      } else {
        starredItems.push(recipeId);
      }
      localStorage.setItem('starred', starredItems.join(','));
    } else {
      localStorage.setItem('starred', recipeId);
    }
  }
}

export default alt.createStore(RecipeStore);
