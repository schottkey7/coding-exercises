(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var HomeActions = (function () {
  function HomeActions() {
    _classCallCheck(this, HomeActions);

    this.generateActions('getAllRecipesSuccess', 'getAllRecipesFail', 'incrementPageId', 'decrementPageId');
  }

  /*
   * Gets all recipes by using the api
   * at /api/recipes defined in server.js
   */

  _createClass(HomeActions, [{
    key: 'getAllRecipes',
    value: function getAllRecipes() {
      var _this = this;

      $.ajax({ url: '/api/recipes' }).done(function (data) {
        _this.actions.getAllRecipesSuccess(data);
      }).fail(function (jqXhr) {
        _this.actions.getAllRecipesFail(jqXhr.responseJSON.message);
      });
    }
  }]);

  return HomeActions;
})();

exports['default'] = _alt2['default'].createActions(HomeActions);
module.exports = exports['default'];

},{"../alt":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _underscore = require('underscore');

var NavbarActions = function NavbarActions() {
  _classCallCheck(this, NavbarActions);

  this.generateActions('updateSearchQuery', 'clearSearchTerm', 'handleCheckBox');
};

exports['default'] = _alt2['default'].createActions(NavbarActions);
module.exports = exports['default'];

},{"../alt":4,"underscore":"underscore"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var RecipeActions = (function () {
  function RecipeActions() {
    _classCallCheck(this, RecipeActions);

    this.generateActions('getRecipeSuccess', 'getRecipeFail', 'starItem');
  }

  /*
   * Get individual recipe by recipe ID
   */

  _createClass(RecipeActions, [{
    key: 'getRecipe',
    value: function getRecipe(recipeId) {
      var _this = this;

      $.ajax({ url: '/api/recipe/' + recipeId }).done(function (data) {
        _this.actions.getRecipeSuccess(data);
      }).fail(function (jqXhr) {
        _this.actions.getRecipeFail(jqXhr);
      });
    }
  }]);

  return RecipeActions;
})();

exports['default'] = _alt2['default'].createActions(RecipeActions);
module.exports = exports['default'];

},{"../alt":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _alt = require('alt');

var _alt2 = _interopRequireDefault(_alt);

exports['default'] = new _alt2['default']();
module.exports = exports['default'];

},{"alt":"alt"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Navbar = require('./Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var App = (function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    _get(Object.getPrototypeOf(App.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(_Navbar2['default'], null),
        _react2['default'].createElement(_reactRouter.RouteHandler, null)
      );
    }
  }]);

  return App;
})(_react2['default'].Component);

exports['default'] = App;
module.exports = exports['default'];

},{"./Navbar":7,"react":"react","react-router":"react-router"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _storesHomeStore = require('../stores/HomeStore');

var _storesHomeStore2 = _interopRequireDefault(_storesHomeStore);

var _actionsHomeActions = require('../actions/HomeActions');

var _actionsHomeActions2 = _interopRequireDefault(_actionsHomeActions);

var _storesNavbarStore = require('../stores/NavbarStore');

var _storesNavbarStore2 = _interopRequireDefault(_storesNavbarStore);

var _actionsNavbarActions = require('../actions/NavbarActions');

var _actionsNavbarActions2 = _interopRequireDefault(_actionsNavbarActions);

var _messagesJson = require('../../messages.json');

var _messagesJson2 = _interopRequireDefault(_messagesJson);

var Home = (function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home(props) {
    _classCallCheck(this, Home);

    _get(Object.getPrototypeOf(Home.prototype), 'constructor', this).call(this, props);
    this.state = _storesHomeStore2['default'].getState();
    this.state.nav = _storesNavbarStore2['default'].getState();
    this.onChange = this.onChange.bind(this);
  }

  /*
   * Subscribe to HomeStore and NavbarStore after the component mounts.
   * Then get all the recipes.
   */

  _createClass(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storesHomeStore2['default'].listen(this.onChange);
      _storesNavbarStore2['default'].listen(this.onChange);
      _actionsHomeActions2['default'].getAllRecipes();
    }

    /*
     * Clear the search term in the search bar when the user navigates
     * away from the home page. Then, unsubscribe from HomeStore and NavbarStore.
     */
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _actionsNavbarActions2['default'].clearSearchTerm();
      _storesHomeStore2['default'].unlisten(this.onChange);
      _storesNavbarStore2['default'].unlisten(this.onChange);
    }

    /*
     * When the store changes, update the state. Because we have subscribed
     * to 2 stores, we have to check which store has updated.
     */
  }, {
    key: 'onChange',
    value: function onChange(state) {
      if (typeof state.searchQuery === 'string') {
        this.setState({
          pageId: state.pageId,
          nav: {
            searchQuery: state.searchQuery,
            starredChecked: state.starredChecked,
            itemsPerPage: state.itemsPerPage
          }
        });
      } else {
        this.setState({
          pageId: state.pageId,
          recipes: state.recipes
        });
      }
    }

    /*
     * Adds a recipe thumbnail item to the list and truncates the title
     * if it's too long
     */
  }, {
    key: 'addItem',
    value: function addItem(lst, recipe, maxTitleLen) {

      if (recipe.title.length > maxTitleLen) {
        recipe.title = recipe.title.slice(0, maxTitleLen) + '...';
      }

      lst.push(_react2['default'].createElement(
        'div',
        { key: recipe.recipe_id, className: 'col-xs-4 col-sm-4 col-md-4' },
        _react2['default'].createElement(
          'div',
          { className: 'thumbnail' },
          _react2['default'].createElement(
            _reactRouter.Link,
            { to: '/recipe/' + recipe.recipe_id },
            _react2['default'].createElement('img', { className: 'recipe-img__min', src: recipe.image_url })
          ),
          _react2['default'].createElement(
            'div',
            { className: 'caption text-center' },
            _react2['default'].createElement(
              'p',
              { id: 'recipe-title' },
              _react2['default'].createElement(
                _reactRouter.Link,
                { to: '/recipe/' + recipe.recipe_id },
                _react2['default'].createElement(
                  'strong',
                  null,
                  recipe.title
                )
              )
            )
          )
        )
      ));
    }

    /*
     * Searches through the tags defined in recipes.json for the search term
     * typed into the search box
     */
  }, {
    key: 'foundMatch',
    value: function foundMatch(term, tags) {
      for (var i = 0; i < tags.length; i++) {
        if (term.length >= tags[i].length) {
          if (term.match(tags[i])) {
            return true;
          }
        } else {
          if (tags[i].match(term)) {
            return true;
          }
        }
      }
      return false;
    }

    /*
     * Filters recipe items by the search term
     */
  }, {
    key: 'filterRecipeByTerm',
    value: function filterRecipeByTerm(recipeItems, maxTitleLen, searchQuery) {
      var _this = this;

      this.state.recipes.forEach(function (recipe) {
        if (_this.foundMatch(searchQuery.toLowerCase(), recipe.tags) && _this.shouldDisplayRecipe(recipe.recipe_id)) {
          _this.addItem(recipeItems, recipe, maxTitleLen);
        }
      });
    }

    /*
     * Filters recipe items by cooking time
     */
  }, {
    key: 'filterRecipeByCookingTime',
    value: function filterRecipeByCookingTime(recipeItems, maxTitleLen, searchQuery) {
      var _this2 = this;

      var cookingTime = parseInt(searchQuery);
      this.state.recipes.forEach(function (recipe) {
        if (cookingTime >= parseInt(recipe.cooking_time) && _this2.shouldDisplayRecipe(recipe.recipe_id)) {
          _this2.addItem(recipeItems, recipe, maxTitleLen);
        }
      });
    }
  }, {
    key: 'shouldDisplayRecipe',
    value: function shouldDisplayRecipe(recipeId) {
      var result = true;
      if (this.state.nav.starredChecked) {
        if (localStorage.starred) {
          var starredItems = localStorage.starred.split(',');
          if (starredItems.indexOf(recipeId) === -1) {
            result = false;
          }
        } else {
          result = false;
        }
      }
      return result;
    }
  }, {
    key: 'displayAllRecipes',
    value: function displayAllRecipes(recipeItems, maxTitleLen) {
      var _this3 = this;

      this.state.recipes.forEach(function (recipe) {
        if (_this3.shouldDisplayRecipe(recipe.recipe_id)) {
          _this3.addItem(recipeItems, recipe, maxTitleLen);
        }
      });
      return recipeItems;
    }
  }, {
    key: 'isNumeric',
    value: function isNumeric(n) {
      return !isNaN(parseInt(n)) && isFinite(n);
    }
  }, {
    key: 'render',
    value: function render() {
      var recipeItems = [],
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
            searchQuery = searchQuery.replace('minutes', '').trim();
          } else if (searchQuery.match('mins')) {
            searchQuery = searchQuery.replace('mins', '').trim();
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
        return _react2['default'].createElement(
          'h4',
          { id: 'recipe-not-found' },
          _messagesJson2['default'].noResults
        );
      }

      // if there are items after filtering
      if (!recipeItems.length) {
        // and starred is checked
        if (this.state.nav.starredChecked) {
          // and there is a search term in the search box
          if (searchQuery) {
            return(
              // display a message saying there are no starred items that
              // contain the search term
              _react2['default'].createElement(
                'h4',
                { id: 'recipe-not-found' },
                _messagesJson2['default'].starredFiltered
              )
            );
          } else {
            // if there isn't a search term, return a message saying there are
            // no starred items
            return _react2['default'].createElement(
              'h4',
              { id: 'recipe-not-found' },
              _messagesJson2['default'].starred
            );
          }
        } else {
          // if there aren't any items and the starred checkbox isn't checked
          // return a message saying there are no results for the search term
          return _react2['default'].createElement(
            'h4',
            { id: 'recipe-not-found' },
            _messagesJson2['default'].filtered
          );
        }
      }

      // if the items of recipes contains more items than allowed for one page
      // only get the relevant items and add 'previous' and 'next' buttons
      if (recipeItems.length > itemsPerPage) {
        var prevBtnStatus = !this.state.pageId ? 'disabled' : null,
            nextBtnStatus = recipeItems.length / (this.state.pageId + 1) < itemsPerPage ? 'disabled' : null,
            startIndx = this.state.pageId * itemsPerPage;

        recipeItems = recipeItems.splice(startIndx, itemsPerPage);

        recipeItems.push(_react2['default'].createElement(
          'div',
          { key: 'btn-group', className: 'container btn-group' },
          _react2['default'].createElement(
            'button',
            { key: 'prev', className: 'btn btn-default btn-group__left ' + prevBtnStatus,
              onClick: _actionsHomeActions2['default'].decrementPageId.bind(this, prevBtnStatus) },
            'Previous'
          ),
          _react2['default'].createElement(
            'button',
            { key: 'next', className: 'btn btn-default btn-group__right ' + nextBtnStatus,
              onClick: _actionsHomeActions2['default'].incrementPageId.bind(this, nextBtnStatus) },
            'Next'
          )
        ));
      }

      return _react2['default'].createElement(
        'div',
        { className: 'container' },
        _react2['default'].createElement(
          'div',
          { className: 'row' },
          recipeItems
        )
      );
    }
  }]);

  return Home;
})(_react2['default'].Component);

exports['default'] = Home;
module.exports = exports['default'];

},{"../../messages.json":14,"../actions/HomeActions":1,"../actions/NavbarActions":2,"../stores/HomeStore":11,"../stores/NavbarStore":12,"react":"react","react-router":"react-router"}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _storesNavbarStore = require('../stores/NavbarStore');

var _storesNavbarStore2 = _interopRequireDefault(_storesNavbarStore);

var _actionsNavbarActions = require('../actions/NavbarActions');

var _actionsNavbarActions2 = _interopRequireDefault(_actionsNavbarActions);

var _storesHomeStore = require('../stores/HomeStore');

var _storesHomeStore2 = _interopRequireDefault(_storesHomeStore);

var Navbar = (function (_React$Component) {
  _inherits(Navbar, _React$Component);

  function Navbar(props) {
    _classCallCheck(this, Navbar);

    _get(Object.getPrototypeOf(Navbar.prototype), 'constructor', this).call(this, props);
    this.state = _storesNavbarStore2['default'].getState();
    this.onChange = this.onChange.bind(this);
  }

  /*
   * Subscribe to NavbarStore and HomeStore and get a total
   * recipes count as defined in recipes.json
   */

  _createClass(Navbar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storesNavbarStore2['default'].listen(this.onChange);
      _storesHomeStore2['default'].listen(this.onChange);
      this.state.recipesCount = _storesHomeStore2['default'].getState().recipesCount;
    }

    /*
     * Unsubscribe from the stores
     */
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesNavbarStore2['default'].unlisten(this.onChange);
      _storesHomeStore2['default'].unlisten(this.onChange);
    }

    /*
     * Whenever the stores change - update the state
     */
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      // Display the navigation bar
      return _react2['default'].createElement(
        'nav',
        { className: 'navbar navbar-default navbar-static-top' },
        _react2['default'].createElement(
          'div',
          { id: 'navbar', className: 'navbar-collapse collapse' },
          _react2['default'].createElement(
            'ul',
            { className: 'nav navbar-nav navbar-centered' },
            _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                _reactRouter.Link,
                { to: '/' },
                'Home'
              )
            )
          ),
          _react2['default'].createElement(
            'form',
            { ref: 'searchForm',
              className: 'navbar-form navbar-centered' },
            _react2['default'].createElement(
              'div',
              { className: 'input-group' },
              _react2['default'].createElement('input', { type: 'text',
                className: 'form-control',
                placeholder: this.state.recipesCount + ' recipes',
                value: this.state.searchQuery,
                onChange: _actionsNavbarActions2['default'].updateSearchQuery }),
              _react2['default'].createElement(
                'span',
                { className: 'input-group-btn' },
                _react2['default'].createElement(
                  'button',
                  { className: 'btn btn-default', disabled: true },
                  _react2['default'].createElement('span', { className: 'glyphicon glyphicon-search' })
                )
              )
            ),
            _react2['default'].createElement(
              'label',
              null,
              _react2['default'].createElement(
                'input',
                { type: 'checkbox',
                  onChange: _actionsNavbarActions2['default'].handleCheckBox },
                ' Only show starred'
              )
            )
          )
        )
      );
    }
  }]);

  return Navbar;
})(_react2['default'].Component);

exports['default'] = Navbar;
module.exports = exports['default'];

},{"../actions/NavbarActions":2,"../stores/HomeStore":11,"../stores/NavbarStore":12,"react":"react","react-router":"react-router"}],8:[function(require,module,exports){
/*jshint camelcase: false */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _storesRecipeStore = require('../stores/RecipeStore');

var _storesRecipeStore2 = _interopRequireDefault(_storesRecipeStore);

var _actionsRecipeActions = require('../actions/RecipeActions');

var _actionsRecipeActions2 = _interopRequireDefault(_actionsRecipeActions);

var _messagesJson = require('../../messages.json');

var _messagesJson2 = _interopRequireDefault(_messagesJson);

var Recipe = (function (_React$Component) {
  _inherits(Recipe, _React$Component);

  function Recipe(props) {
    _classCallCheck(this, Recipe);

    _get(Object.getPrototypeOf(Recipe.prototype), 'constructor', this).call(this, props);
    this.state = _storesRecipeStore2['default'].getState();
    this.onChange = this.onChange.bind(this);
  }

  /*
   * Subscribe to the RecipeStore and get a recipe by ID
   */

  _createClass(Recipe, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storesRecipeStore2['default'].listen(this.onChange);
      _actionsRecipeActions2['default'].getRecipe(this.props.params.id);
    }

    /*
     * Unsubscribe from the RecipeStore
     */
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesRecipeStore2['default'].unlisten(this.onChange);
    }

    /*
     * Get a new recipe if the store changes and the previously selected
     * recipe ID is different from the currently selected one
     */
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.params.id !== this.props.params.id) {
        _actionsRecipeActions2['default'].getRecipe(this.props.params.id);
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {

      // if the recipe ID is not in recipes.json, display a 'recipe not found' msg
      if (!this.state.recipe_id) {
        return _react2['default'].createElement(
          'h4',
          { id: 'recipe-not-found' },
          _messagesJson2['default'].notFound
        );
      }

      var ingredients = [],

      // set star as empty by default
      starredStatus = '-empty';

      if (localStorage.starred && localStorage.starred.match(this.state.recipe_id)) {
        // if the recipe ID is found in the localStorage, change the star class
        starredStatus = '';
      }

      // add the ingredients to an unordered list
      for (var key in this.state.ingredients) {
        var val = this.state.ingredients[key];
        if (val === 'none') {
          val = null;
        };
        ingredients.push(_react2['default'].createElement(
          'li',
          { key: key },
          val,
          ' ',
          key
        ));
      }

      // return the detailed recipe page
      return _react2['default'].createElement(
        'div',
        { key: this.state.recipe_id, className: 'col-xs-10 col-sm-10 col-md-10 recipe-container' },
        _react2['default'].createElement('img', { className: 'recipe-img__detail', src: this.state.image_url }),
        _react2['default'].createElement(
          'div',
          { className: 'col-xs-6 col-sm-6 col-md-6 ingredients' },
          _react2['default'].createElement(
            'h3',
            null,
            _react2['default'].createElement(
              _reactRouter.Link,
              { to: '/recipe/' + this.state.recipe_id },
              _react2['default'].createElement(
                'strong',
                null,
                this.state.title
              )
            )
          ),
          _react2['default'].createElement(
            'ul',
            { className: 'ingredients-list' },
            ingredients
          ),
          _react2['default'].createElement(
            'h5',
            { id: 'cooking-time' },
            'Cooking time: ',
            this.state.cooking_time,
            ' minutes.'
          ),
          _react2['default'].createElement('span', { id: 'starred',
            className: 'glyphicon glyphicon-star' + starredStatus,
            onClick: _actionsRecipeActions2['default'].starItem.bind(this, this.state.recipe_id) })
        )
      );
    }
  }]);

  return Recipe;
})(_react2['default'].Component);

Recipe.contextTypes = {
  router: _react2['default'].PropTypes.func.isRequired
};

exports['default'] = Recipe;
module.exports = exports['default'];

},{"../../messages.json":14,"../actions/RecipeActions":3,"../stores/RecipeStore":13,"react":"react","react-router":"react-router"}],9:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

_reactRouter2['default'].run(_routes2['default'], _reactRouter2['default'].HistoryLocation, function (Handler) {
  _react2['default'].render(_react2['default'].createElement(Handler, null), document.getElementById('app'));
});

},{"./routes":10,"react":"react","react-router":"react-router"}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _componentsApp = require('./components/App');

var _componentsApp2 = _interopRequireDefault(_componentsApp);

var _componentsHome = require('./components/Home');

var _componentsHome2 = _interopRequireDefault(_componentsHome);

var _componentsRecipe = require('./components/Recipe');

var _componentsRecipe2 = _interopRequireDefault(_componentsRecipe);

// define routes
exports['default'] = _react2['default'].createElement(
  _reactRouter.Route,
  { handler: _componentsApp2['default'] },
  _react2['default'].createElement(_reactRouter.Route, { path: '/', handler: _componentsHome2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { path: '/recipe/:id', handler: _componentsRecipe2['default'] })
);
module.exports = exports['default'];

},{"./components/App":5,"./components/Home":6,"./components/Recipe":8,"react":"react","react-router":"react-router"}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _actionsHomeActions = require('../actions/HomeActions');

var _actionsHomeActions2 = _interopRequireDefault(_actionsHomeActions);

var HomeStore = (function () {
  function HomeStore() {
    _classCallCheck(this, HomeStore);

    this.bindActions(_actionsHomeActions2['default']);
    this.recipes = [];
    this.recipesCount;
    this.pageId = 0;
    this.maxTitleLen = 30;
  }

  _createClass(HomeStore, [{
    key: 'onGetAllRecipesSuccess',
    value: function onGetAllRecipesSuccess(data) {
      this.recipes = data.recipes;
      this.recipesCount = data.count;
    }
  }, {
    key: 'onGetAllRecipesFail',
    value: function onGetAllRecipesFail(errorMessage) {
      toastr.error(errorMessage);
    }
  }, {
    key: 'onIncrementPageId',
    value: function onIncrementPageId(status) {
      if (!status[0]) {
        this.pageId += 1;
      }
    }
  }, {
    key: 'onDecrementPageId',
    value: function onDecrementPageId(status) {
      if (!status[0]) {
        this.pageId -= 1;
      }
    }
  }]);

  return HomeStore;
})();

exports['default'] = _alt2['default'].createStore(HomeStore);
module.exports = exports['default'];

},{"../actions/HomeActions":1,"../alt":4}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _actionsNavbarActions = require('../actions/NavbarActions');

var _actionsNavbarActions2 = _interopRequireDefault(_actionsNavbarActions);

var _actionsHomeActions = require('../actions/HomeActions');

var _actionsHomeActions2 = _interopRequireDefault(_actionsHomeActions);

var NavbarStore = (function () {
  function NavbarStore() {
    _classCallCheck(this, NavbarStore);

    this.bindActions(_actionsNavbarActions2['default']);
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

  _createClass(NavbarStore, [{
    key: 'onUpdateSearchQuery',
    value: function onUpdateSearchQuery(event) {
      this.searchQuery = event.target.value;
    }

    // clear search term from the search box
  }, {
    key: 'onClearSearchTerm',
    value: function onClearSearchTerm() {
      this.searchQuery = '';
    }

    // toggle starred checkbox
  }, {
    key: 'onHandleCheckBox',
    value: function onHandleCheckBox() {
      this.starredChecked = !this.starredChecked;
    }
  }]);

  return NavbarStore;
})();

exports['default'] = _alt2['default'].createStore(NavbarStore);
module.exports = exports['default'];

},{"../actions/HomeActions":1,"../actions/NavbarActions":2,"../alt":4}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _underscore = require('underscore');

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _actionsRecipeActions = require('../actions/RecipeActions');

var _actionsRecipeActions2 = _interopRequireDefault(_actionsRecipeActions);

Array.prototype.remove = function (from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

var RecipeStore = (function () {
  function RecipeStore() {
    _classCallCheck(this, RecipeStore);

    this.bindActions(_actionsRecipeActions2['default']);
  }

  _createClass(RecipeStore, [{
    key: 'onGetRecipeSuccess',
    value: function onGetRecipeSuccess(data) {
      (0, _underscore.assign)(this, data);
    }
  }, {
    key: 'onGetCharacterFail',
    value: function onGetCharacterFail(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }

    // if a recipe is starred, store its ID in localStorage
    // else remove its ID from localStorage
  }, {
    key: 'onStarItem',
    value: function onStarItem(event) {
      var recipeId = event[0],
          starredItems = localStorage.getItem('starred'),
          starredStatus = true;

      if (starredItems) {
        starredItems = starredItems.split(',');
        var indx = starredItems.indexOf(recipeId);
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
  }]);

  return RecipeStore;
})();

exports['default'] = _alt2['default'].createStore(RecipeStore);
module.exports = exports['default'];

},{"../actions/RecipeActions":3,"../alt":4,"underscore":"underscore"}],14:[function(require,module,exports){
module.exports={
  "starredFiltered" : "Sorry, there are no starred items matching your filter term.",
  "starred" : "Sorry, you don't currently have any starred recipes. Get started by starring recipes you like.",
  "filtered" : "Sorry, nothing matched your filter term.",
  "noResults" : "Sorry, we currently have no recipes for you.",
  "notFound" : "Sorry, this recipe doesn't exist or may have been removed."
}

},{}]},{},[9]);
