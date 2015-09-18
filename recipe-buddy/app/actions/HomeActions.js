import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'getAllRecipesSuccess',
      'getAllRecipesFail',
      'incrementPageId',
      'decrementPageId'
    );
  }

  /*
   * Gets all recipes by using the api
   * at /api/recipes defined in server.js
   */
  getAllRecipes() {
    $.ajax({ url: '/api/recipes' })
      .done(data => {
        this.actions.getAllRecipesSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getAllRecipesFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(HomeActions);
