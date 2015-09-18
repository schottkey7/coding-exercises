import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';
import messages from '../../messages.json';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.state.nav = NavbarStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  /*
   * Subscribe to HomeStore and NavbarStore after the component mounts.
   * Then get all the recipes.
   */
  componentDidMount() {
    HomeStore.listen(this.onChange);
    NavbarStore.listen(this.onChange);
    HomeActions.getAllRecipes();
  }

  /*
   * Clear the search term in the search bar when the user navigates
   * away from the home page. Then, unsubscribe from HomeStore and NavbarStore.
   */
  componentWillUnmount() {
    NavbarActions.clearSearchTerm();
    HomeStore.unlisten(this.onChange);
    NavbarStore.unlisten(this.onChange);
  }

  /*
   * When the store changes, update the state. Because we have subscribed
   * to 2 stores, we have to check which store has updated.
   */
  onChange(state) {
    if (typeof state.searchQuery === 'string') {
      this.setState({
        pageId : state.pageId,
        nav : {
          searchQuery: state.searchQuery,
          starredChecked: state.starredChecked,
          itemsPerPage: state.itemsPerPage
        }
      });
    } else {
      this.setState({
        pageId : state.pageId,
        recipes : state.recipes
      });
    }
  }

  /*
   * Adds a recipe thumbnail item to the list and truncates the title
   * if it's too long
   */
  addItem(lst, recipe, maxTitleLen) {

    if (recipe.title.length > maxTitleLen) {
      recipe.title = recipe.title.slice(0, maxTitleLen) + '...';
    }

    lst.push(
      <div key={recipe.recipe_id} className='col-xs-4 col-sm-4 col-md-4'>
        <div className='thumbnail'>
          <Link to={`/recipe/${recipe.recipe_id}`}>
            <img className="recipe-img__min" src={recipe.image_url}/>
          </Link>
          <div className='caption text-center'>
            <p id="recipe-title">
              <Link to={`/recipe/${recipe.recipe_id}`}>
                <strong>{recipe.title}</strong>
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  /*
   * Searches through the tags defined in recipes.json for the search term
   * typed into the search box
   */
  foundMatch(term, tags) {
    for (let i = 0; i < tags.length; i++) {
      if (term.length >= tags[i].length) {
        if (term.match(tags[i])) { return true; }
      } else {
        if (tags[i].match(term)) { return true; }
      }
    }
    return false;
  }

  /*
   * Filters recipe items by the search term
   */
  filterRecipeByTerm(recipeItems, maxTitleLen, searchQuery) {
    this.state.recipes.forEach(recipe => {
      if (this.foundMatch(searchQuery.toLowerCase(), recipe.tags) && this.shouldDisplayRecipe(recipe.recipe_id)) {
        this.addItem(recipeItems, recipe, maxTitleLen);
      }
    });
  }

  /*
   * Filters recipe items by cooking time
   */
  filterRecipeByCookingTime(recipeItems, maxTitleLen, searchQuery) {
    let cookingTime = parseInt(searchQuery);
    this.state.recipes.forEach(recipe => {
      if (cookingTime >= parseInt(recipe.cooking_time) && this.shouldDisplayRecipe(recipe.recipe_id)) {
        this.addItem(recipeItems, recipe, maxTitleLen);
      }
    });
  }

  shouldDisplayRecipe(recipeId) {
    let result = true;
    if (this.state.nav.starredChecked) {
      if (localStorage.starred) {
        let starredItems = localStorage.starred.split(',');
        if (starredItems.indexOf(recipeId) === -1) {
          result = false;
        }
      } else {
        result = false;
      }
    }
    return result;
  }

  displayAllRecipes(recipeItems, maxTitleLen) {
    this.state.recipes.forEach(recipe => {
      if (this.shouldDisplayRecipe(recipe.recipe_id)) {
        this.addItem(recipeItems, recipe, maxTitleLen);
      }
    });
    return recipeItems;
  }

  isNumeric(n) {
    return !isNaN(parseInt(n)) && isFinite(n);
  }

  render() {
    let recipeItems = [],
        maxTitleLen = this.state.maxTitleLen,
        searchQuery = this.state.nav.searchQuery,
        itemsPerPage = this.state.nav.itemsPerPage;

    // if there are recipes
    if (this.state.recipes) {
      // and there is a search term typed into the search box
      if (searchQuery) {
        searchQuery = searchQuery.trim();
        // and it is the cooking time, remove 'minutes' or 'mins'
        if (searchQuery.match('minutes')) {
          searchQuery = searchQuery.replace('minutes','').trim();
        } else if (searchQuery.match('mins')) {
          searchQuery = searchQuery.replace('mins','').trim();
        }
        // if it is a number
        if (this.isNumeric(searchQuery)) {
          // filter the recipes by cooking time, where the time is the max allowed
          this.filterRecipeByCookingTime(recipeItems, maxTitleLen, searchQuery);
        } else {
          // else filter by the search term
          this.filterRecipeByTerm(recipeItems, maxTitleLen, searchQuery);
        }
      } else {
        // if there isn't a search term, display all
        // (taking into account whether starred is checked)
        this.displayAllRecipes(recipeItems, maxTitleLen);
      }
    } else {
      // if there aren't recipes, display a message
      return (
        <h4 id="recipe-not-found">{messages.noResults}</h4>
      );
    }

    // if there are items after filtering
    if (!recipeItems.length) {
      // and starred is checked
      if (this.state.nav.starredChecked) {
        // and there is a search term in the search box
        if (searchQuery) {
          return (
            // display a message saying there are no starred items that
            // contain the search term
            <h4 id="recipe-not-found">
              {messages.starredFiltered}
            </h4>
          );
        } else {
          // if there isn't a search term, return a message saying there are
          // no starred items
          return (
            <h4 id="recipe-not-found">
              {messages.starred}
            </h4>
          );
        }
      } else {
        // if there aren't any items and the starred checkbox isn't checked
        // return a message saying there are no results for the search term
        return (
          <h4 id="recipe-not-found">{messages.filtered}</h4>
        );
      }
    }

    // if the items of recipes contains more items than allowed for one page
    // only get the relevant items and add 'previous' and 'next' buttons
    if (recipeItems.length > itemsPerPage) {
      let prevBtnStatus = (!this.state.pageId) ? 'disabled' : null,
          nextBtnStatus = ((recipeItems.length / (this.state.pageId + 1)) < itemsPerPage) ? 'disabled' : null,
          startIndx = this.state.pageId * itemsPerPage;

      recipeItems = recipeItems.splice(startIndx,itemsPerPage);

      recipeItems.push(
        <div key="btn-group" className="container btn-group">
          <button key="prev" className={`btn btn-default btn-group__left ${prevBtnStatus}`}
                  onClick={HomeActions.decrementPageId.bind(this, prevBtnStatus)}>Previous
          </button>
          <button key="next" className={`btn btn-default btn-group__right ${nextBtnStatus}`}
                  onClick={HomeActions.incrementPageId.bind(this, nextBtnStatus)}>Next
          </button>
        </div>
      );
    }

    return (
      <div className='container'>
        <div className='row'>
          {recipeItems}
        </div>
      </div>
    );
  }
}

export default Home;
