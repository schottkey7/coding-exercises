import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.recipes = [];
    this.recipesCount;
    this.pageId = 0;
    this.maxTitleLen = 30;
  }

  onGetAllRecipesSuccess(data) {
    this.recipes = data.recipes;
    this.recipesCount = data.count;
  }

  onGetAllRecipesFail(errorMessage) {
    toastr.error(errorMessage);
  }

  onIncrementPageId(status) {
    if (!status[0]) {
      this.pageId += 1;
    }
  }

  onDecrementPageId(status) {
    if (!status[0]) {
      this.pageId -= 1;
    }
  }
}

export default alt.createStore(HomeStore);
