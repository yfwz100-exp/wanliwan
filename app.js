/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  settings = require('./dbs/settings'),
  MongoStore = require('connect-mongo')(express);

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(path.join(__dirname,'/public/images/favicon.ico')));
  app.use(express.logger('dev'));
  app.use(express.bodyParser({uploadDir:'./tmp'}));
  app.use(express.methodOverride());
  app.use(express.cookieParser(settings.cookieSecret));
  app.use(express.session({
    secret: settings.cookieSecret,
    store: new MongoStore({
      db: settings.db
    })
  }));
  app.use(app.router);
  app.use(require('less-middleware')({
    src: path.join(__dirname, 'public')
  }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

app.map = function map(routes, p) {
  if (p == null) p = '';
  for (r in routes) {
    switch (typeof routes[r]) {
      case 'object':
        if (r[0] == '@' || r[0] == '/') {
          app.map(routes[r], r);
        } else if (r[0] == '(') {
          app.map(routes[r], p + r);
        } else {
          app.map(routes[r], p + '/' + r);
        }
        break;
      case 'function':
        if (p[0] != '@') {
          app[r](p?p:'/', routes[r]);
          console.log(p);
        } else {
          app[r](new RegExp(p.substring(1)), routes[r]);
        }
        break;
      default:
        console.error('Unknown route at %s...', r);
    }
  }
};

app.map(routes);

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
