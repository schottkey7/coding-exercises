var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var logger = require('morgan');
var React = require('react');
var Router = require('react-router');
var swig  = require('swig');
var _ = require('underscore');

var routes = require('./app/routes');
var app = express();

// set the port on which the server will run
app.set('port', process.env.PORT || 3000);
app.use(compression());
// enable logger
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * GET /api/recipes
 * Returns all recipes in recipes.json
 */
app.get('/api/recipes', function(req, res, next) {
  let recipes = require('./recipes.json');
  return res.send(recipes);
});


/**
 * GET /api/recipe/:id
 * Returns detailed recipe information.
 */
app.get('/api/recipe/:id', function(req, res, next) {
  let id = req.params.id,
      recipes = require('./recipes.json').recipes,
      found = false,
      recipe = null;

  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].recipe_id === id) {
      found = true;
      recipe = recipes[i];
      break;
    }
  }

  if (!found) {
    res.status(404).send({message: 'Recipe not found.'});
  }

  res.send(recipe);

});

// render index.html
app.use(function(req, res) {
  Router.run(routes, req.path, function(Handler) {
    var html = React.renderToString(React.createElement(Handler));
    var page = swig.renderFile('views/index.html', { html: html });
    res.send(page);
  });
});

// create server
var server = require('http').createServer(app);

// set the server to listen on the specified port
server.listen(app.get('port'), function() {
  console.log(`Express server listening on port ${app.get('port')}`);
});
