/*jshint camelcase: false */
import React from 'react';
import {Link} from 'react-router';
import RecipeStore from '../stores/RecipeStore';
import RecipeActions from '../actions/RecipeActions';
import messages from '../../messages.json';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = RecipeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  /*
   * Subscribe to the RecipeStore and get a recipe by ID
   */
  componentDidMount() {
    RecipeStore.listen(this.onChange);
    RecipeActions.getRecipe(this.props.params.id);
  }

  /*
   * Unsubscribe from the RecipeStore
   */
  componentWillUnmount() {
    RecipeStore.unlisten(this.onChange);
  }

  /*
   * Get a new recipe if the store changes and the previously selected
   * recipe ID is different from the currently selected one
   */
  componentDidUpdate(prevProps) {
    if (prevProps.params.id !== this.props.params.id) {
      RecipeActions.getRecipe(this.props.params.id);
    }
  }

  onChange(state) {
    this.setState(state);
  }

  render() {

    // if the recipe ID is not in recipes.json, display a 'recipe not found' msg
    if (!this.state.recipe_id) {
      return (
        <h4 id="recipe-not-found">
          {messages.notFound}
        </h4>
      );
    }

    let ingredients = [],
        // set star as empty by default
        starredStatus = '-empty';

    if (localStorage.starred && localStorage.starred.match(this.state.recipe_id)) {
      // if the recipe ID is found in the localStorage, change the star class
      starredStatus = '';
    }

    // add the ingredients to an unordered list
    for (let key in this.state.ingredients) {
      let val = this.state.ingredients[key];
      if (val === 'none') { val = null; };
      ingredients.push(
        <li key={key}>{val} {key}</li>
      );
    }

    // return the detailed recipe page
    return (
      <div key={this.state.recipe_id} className='col-xs-10 col-sm-10 col-md-10 recipe-container'>
        <img className="recipe-img__detail" src={this.state.image_url}/>
        <div className='col-xs-6 col-sm-6 col-md-6 ingredients'>
          <h3>
            <Link to={`/recipe/${this.state.recipe_id}`}>
              <strong>{this.state.title}</strong>
            </Link>
          </h3>
          <ul className="ingredients-list">
            {ingredients}
          </ul>
          <h5 id="cooking-time">Cooking time: {this.state.cooking_time} minutes.</h5>
          <span id="starred"
                className={`glyphicon glyphicon-star${starredStatus}`}
                onClick={RecipeActions.starItem.bind(this, this.state.recipe_id)}>
          </span>
        </div>
      </div>
    );
  }
}

Recipe.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Recipe;
