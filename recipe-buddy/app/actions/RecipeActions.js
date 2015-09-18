import alt from '../alt';

class RecipeActions {
  constructor() {
    this.generateActions(
      'getRecipeSuccess',
      'getRecipeFail',
      'starItem'
    );
  }

  /*
   * Get individual recipe by recipe ID
   */
  getRecipe(recipeId) {
    $.ajax({ url: `/api/recipe/${recipeId}`})
      .done((data) => {
        this.actions.getRecipeSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getRecipeFail(jqXhr);
      });
  }

}

export default alt.createActions(RecipeActions);
