'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('regenerator-runtime/runtime');
var express = _interopDefault(require('express'));
var morgan = _interopDefault(require('morgan'));
var path = _interopDefault(require('path'));
var session = _interopDefault(require('express-session'));
var bodyParser = _interopDefault(require('body-parser'));
var debug = _interopDefault(require('debug'));
var crypto = _interopDefault(require('crypto'));
var Blowfish = _interopDefault(require('xs-blowfish'));
var apicache = _interopDefault(require('apicache'));
var mysql = _interopDefault(require('mysql'));
var comysql = _interopDefault(require('co-mysql'));
var APP_ROOT = _interopDefault(require('app-root-path'));
var SqlString = _interopDefault(require('sqlstring'));
var prompt = _interopDefault(require('prompt-promise'));
var colors = _interopDefault(require('colors'));
var moment = _interopDefault(require('moment'));
var compression = _interopDefault(require('compression'));

var appConfig = {
  theme: 'light',
  title: 'Quantum Impact',
  users: {
    database: 'qdca',
    table: '_users'
  },
  ports: {
    http: 3008,
    io: 8090
  }
};

var name = "fulfillment";
var version = "0.0.1";
var description = "App to connect the community with those in need";
var main = "dist/index.js";
var scripts = { "clean": "rimraf dist && rimraf dist-dev", "std": "standard --verbose | snazzy", "start": "node dist/index.js", "start:dev": "nodemon --watch . ./server/index.js --exec babel-node & npm run watch:client", "start:windows": "start nodemon --watch . ./server/index.js --exec babel-node & npm run watch:client", "start:prod": "nodemon --watch . ./dist/index.js & npm run watch:client & npm run watch:server", "start:server": "nodemon ./server/index.js --exec babel-node", "start:all": "npm run start:server & npm run start:client", "prebuild": "npm run clean", "build": "npm run build:server & npm run build:client", "build:client": "webpack -p --progress", "build:server": "rollup -c rollup.server.js", "watch:client": "webpack --progress --watch", "user": "babel-node ./server/auth/users.js", "data": "babel-node ./server/data/addData.js" };
var repository = { "type": "git", "url": "git+https://github.com/QRIGroup/fulfillment.git" };
var author = "";
var contributors = ["Aldo Sanchez <aldo.sanchez@qrigroup.com>", "Kate Lewis <kate.lewis@qrigroup.com>", "Ruth Black <ruth.black@qrigroup.com>", "Schaeffer Reed <schaeffer.reed@qrigroup.com>"];
var license = "NONE";
var bugs = { "url": "https://github.com/QRIGroup/fulfillment/issues" };
var homepage = "https://github.com/QRIGroup/fulfillment#readme";
var dependencies = { "apicache": "^0.8.4", "app-root-path": "^2.0.1", "async": "^2.5.0", "aws-sdk": "^2.94.0", "axios": "^0.16.1", "body-parser": "^1.15.2", "classnames": "^2.2.5", "co-mysql": "^1.0.0", "colors": "^1.1.2", "compression": "^1.6.2", "debug": "^2.2.0", "express": "^4.14.0", "express-session": "^1.14.1", "fs-path": "0.0.23", "fuse.js": "^3.0.4", "inquirer": "^3.2.3", "moment-precise-range-plugin": "^1.2.3", "mongoose": "^4.11.1", "morgan": "^1.7.0", "mysql": "^2.11.1", "oboe": "^2.1.3", "path": "^0.12.7", "prompt-promise": "^1.0.3", "react-table": "^6.5.3", "regenerator-runtime": "^0.10.5", "remeasure": "^2.3.1", "require_optional": "^1.0.1", "url-loader": "^0.5.7", "whatwg-fetch": "^2.0.3", "xs-blowfish": "^2.0.0" };
var devDependencies = { "autobind-decorator": "^1.3.4", "autoprefixer-loader": "^3.2.0", "babel-cli": "^6.11.4", "babel-core": "^6.11.4", "babel-eslint": "^7.2.1", "babel-loader": "^7.0.0", "babel-plugin-external-helpers": "^6.18.0", "babel-plugin-syntax-object-rest-spread": "^6.13.0", "babel-plugin-transform-decorators-legacy": "^1.3.4", "babel-plugin-transform-object-rest-spread": "^6.23.0", "babel-polyfill": "^6.16.0", "babel-preset-es2015": "^6.9.0", "babel-preset-es2015-native-modules": "^6.9.4", "babel-preset-es2015-rollup": "^3.0.0", "babel-preset-react": "^6.11.1", "babel-preset-react-optimize": "^1.0.1", "babel-preset-stage-0": "^6.16.0", "babelrc-rollup": "^3.0.0", "browser-sync": "^2.17.5", "chai": "^3.5.0", "chai-immutable": "^1.6.0", "classnames": "^2.2.5", "copy-webpack-plugin": "^4.0.0", "css-loader": "^0.28.4", "deep-eql": "^3.0.0", "deep-equal": "^1.0.1", "eslint": "^3.19.0", "exports-loader": "^0.6.3", "file-loader": "^0.11.1", "immutable": "^3.8.1", "imports-loader": "^0.7.1", "isomorphic-fetch": "^2.2.1", "lodash": "^4.17.4", "marked": "^0.3.6", "mocha": "^3.0.2", "moment": "^2.16.0", "node-sass": "^4.3.0", "nodemon": "^1.10.2", "npm-run-all": "^4.0.2", "onchange": "^3.0.2", "postcss-loader": "^2.0.3", "query-string": "^5.0.0", "react": "^15.5.4", "react-addons-css-transition-group": "^15.5.2", "react-addons-pure-render-mixin": "^15.3.0", "react-addons-test-utils": "^15.3.0", "react-dom": "^15.3.2", "react-grid-layout": "^0.14.6", "react-hot-loader": "^3.0.0-beta.5", "react-loader": "^2.4.2", "react-measure": "^1.4.7", "react-redux": "^5.0.4", "react-router": "^3.0.0", "react-router-redux": "^4.0.6", "react-rpg": "^2.0.0", "react-tabs-redux": "^1.5.0", "redux": "^3.5.2", "redux-devtools": "^3.3.1", "redux-immutable": "^4.0.0", "redux-registry": "^0.0.9", "redux-thunk": "^2.1.0", "rimraf": "^2.5.4", "rollup": "^0.45.1", "rollup-plugin-babel": "^2.6.1", "rollup-plugin-commonjs": "^8.0.2", "rollup-plugin-eslint": "^3.0.0", "rollup-plugin-json": "^2.0.2", "rollup-plugin-node-globals": "^1.0.9", "rollup-plugin-node-resolve": "^3.0.0", "rollup-plugin-replace": "^1.1.1", "rollup-plugin-uglify": "^2.0.1", "sass-loader": "^6.0.3", "snazzy": "^7.0.0", "standard": "^10.0.2", "style-loader": "^0.17.0", "webpack": "^2.1.0-beta.25", "webpack-dev-middleware": "^1.8.4", "webpack-dev-server": "^2.1.0-beta.8", "webpack-hot-middleware": "^2.13.0", "whatwg-fetch": "^2.0.3" };
var pkg = {
	name: name,
	version: version,
	description: description,
	main: main,
	scripts: scripts,
	repository: repository,
	author: author,
	contributors: contributors,
	license: license,
	bugs: bugs,
	homepage: homepage,
	dependencies: dependencies,
	devDependencies: devDependencies
};

var message = debug('sessions');
var DEFAULT_EXPIRATION = 3600000;
var HASH_SECRET = 'lazard-demo v' + pkg.version;
var hmac = crypto.createHmac('sha256', HASH_SECRET);
var bf = new Blowfish(HASH_SECRET);

// extend Date with .add(ms) functionality
Date.prototype.add = function (ms) {
  this.setTime(this.getTime() + ms);
  return this;
};

Date.prototype.toUTC = function () {
  return Date.UTC(this.getUTCFullYear(), this.getUTCMonth(), this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds(), this.getUTCMilliseconds());
};

// global sessions object
var sessions = {};

function timeoutSession(sessionid, duration) {
  return setTimeout(function () {
    var session$$1 = sessions[sessionid];

    if (session$$1) {
      message('user session for ' + session$$1.user.name + ' expired');
      delete sessions[sessionid];
    }
  }, duration);
}

function clearSessions(user) {
  Object.keys(sessions).forEach(function (sessionid) {
    var session$$1 = sessions[sessionid];
    if (session$$1.user.id === user.id) {
      clearTimeout(session$$1.timeout);
      delete sessions[sessionid];
    }
  });
}

function createSession(user, token) {
  var session$$1 = {
    user: user,
    expires: new Date().add(DEFAULT_EXPIRATION)
  };

  token.expires = new Date().add(DEFAULT_EXPIRATION);
  user.token = bf.encrypt(JSON.stringify(token));

  var sessionid = user.sessionid = crypto.createHmac('sha256', HASH_SECRET).update(JSON.stringify(user)).digest('hex');

  session$$1.timeout = timeoutSession(sessionid, DEFAULT_EXPIRATION);

  // clear existing sessions for user
  clearSessions(user);

  // store new session
  sessions[sessionid] = session$$1;

  message('creating user session for ' + user.name + ' with sessionid ' + sessionid);

  return user;
}

function listSessions() {
  return Object.keys(sessions).map(function (sessionid) {
    return sessions[sessionid].user;
  });
}

function autoRefreshSession(req, res, next) {
  var user = req.session && req.session.user;

  user && refreshSession(user.sessionid);

  next();
}

function refreshSession(sessionid) {
  var storedSession = sessions[sessionid];

  if (storedSession) {
    message('refreshing user session for ' + storedSession.user.name + '...');
    clearTimeout(storedSession.timeout);
    Object.assign(storedSession, {
      expires: new Date().add(DEFAULT_EXPIRATION),
      timeout: timeoutSession(sessionid, DEFAULT_EXPIRATION)
    });
  }
}

function resumeSession(sessionid) {
  var storedSession = sessions[sessionid];

  if (storedSession) {
    var user = storedSession.user;

    message('resuming user session for ' + user.name);
    refreshSession(sessionid);

    return user;
  }

  return false;
}

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();



























var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var StringTimer = function () {
  function StringTimer(init) {
    classCallCheck(this, StringTimer);

    Object.assign(this, {
      log: [new Date()], // running log of timestamps
      stamps: {}, // lookup table of manually-named timestamps
      at: null, // internal position for comparison
      formatter: this.format, // defaults to internal formatter, but may override with any external library
      logLimit: 1000 // trim log to this many entries
    }, init);
  }

  createClass(StringTimer, [{
    key: 'format',
    value: function format(duration) {
      var unit = 'ms';

      if (duration > 1000) {
        unit = 'sec';
        duration = duration / 1000;

        if (duration > 60) {
          unit = 'min';
          duration = duration / 60;

          if (duration > 60) {
            unit = 'hour';
            duration = duration / 60;
          }
        }
      }

      return '' + duration + unit;
    }
  }, {
    key: 'elapsed',
    value: function elapsed(key) {
      var distance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      return new Date() - (this.at || [].concat(toConsumableArray(this.log)).slice(-distance)[0]);
    }
  }, {
    key: 'from',
    value: function from(key) {
      this.at = this.stamps[key];
      return this;
    }
  }, {
    key: 'set',
    value: function set$$1(key) {
      var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();

      if (key) {
        this.stamps[key] = date;
      }

      // sets at cursor to one position back
      var _log$slice = this.log.slice(-1);

      var _log$slice2 = slicedToArray(_log$slice, 1);

      this.at = _log$slice2[0];
      this.log = [].concat(toConsumableArray(this.log), [date]).slice(-this.logLimit); // append new date to log and take last [logLimit]
      this.total = this.formatter(new Date() - this.log[0]);
      return this;
    }
  }, {
    key: 'toString',
    value: function toString() {
      var elapsed = this.elapsed();
      this.set();

      // resets at cursor to current last entry

      var _log$slice3 = this.log.slice(-1);

      var _log$slice4 = slicedToArray(_log$slice3, 1);

      this.at = _log$slice4[0];
      return this.formatter(elapsed);
    }
  }]);
  return StringTimer;
}();

var credentials = require(APP_ROOT + '/credentials.json');
var databases = require(APP_ROOT + '/databases.json');
var message$2 = debug('database');

var db = {
  get: function get(alias) {
    message$2('get db with alias', alias);
    if (!alias) {
      // console.log(databases)
      var alias = Object.keys(databases)[0];
      message$2('alias not defined, using default', alias);
    }
    var db = databases[alias];
    var dbConfig = Object.assign({
      connectionLimit: 10,
      host: db.host,
      database: db.database,
      multipleStatements: true,
      debug: false
    }, credentials[alias]);
    message$2('creating connection', dbConfig);
    var pool = mysql.createPool(dbConfig);
    var connection = comysql(pool);

    return connection;
  }
};

var message$1 = debug('query-builder');

var QueryBuilder = function () {
  function QueryBuilder(options) {
    classCallCheck(this, QueryBuilder);

    this._query = {
      select: [],
      sql: null,
      from: null,
      where: [],
      joins: [],
      groupBy: [],
      orderBy: [],
      limit: 100000
    };

    this.options = options || {};
    this.postFilters = [];
    this.transforms = [];
    this.setDB();
  }

  createClass(QueryBuilder, [{
    key: 'addPostFilter',
    value: function addPostFilter(filter) {
      this.postFilters.push(filter);

      return this;
    }
  }, {
    key: 'addTransform',
    value: function addTransform(transform) {
      this.transforms.push(transform);

      return this;
    }

    // shorthand syntax and === where

  }, {
    key: 'and',
    value: function and(condition) {
      return this.where(condition);
    }

    // shorthand syntax andWhere === where

  }, {
    key: 'andWhere',
    value: function andWhere(condition) {
      return this.where(condition);
    }
  }, {
    key: 'query',
    value: function query(sql, callback) {
      return this.fromSQL(sql).execute(callback);
    }
  }, {
    key: 'execute',
    value: function execute(callback) {
      var _this = this;

      var _query = this._query,
          sql = _query.sql,
          from = _query.from;


      try {
        if (!(sql || from)) {
          return callback('No API target defined');
        }
        var time = new StringTimer();

        return this.db.query(this.toSQL(), function (err, results) {
          message$1('query execution: ' + time, results);
          var data = results;
          if (results && results.pop) {
            data = results.pop();
          }

          if (!err && results) {
            if (_this.postFilters.length) {
              _this.postFilters.forEach(function (filter) {
                return data = filter(data);
              });
              message$1('filter processing: ' + time);
            }

            if (_this.transforms.length) {
              _this.transforms.forEach(function (transform) {
                return data = transform(data);
              });
              message$1('transform processing: ' + time);
            }
          }

          message$1('total execution time: ' + time.total);
          return callback(err, data);
        });
      } catch (err) {
        message$1('ERROR executing sql:', this.toSQL(), err);
      }
    }
  }, {
    key: 'from',
    value: function from(table, alias) {
      this._query.from = table + (alias ? ' as ' + alias : '');

      return this;
    }
  }, {
    key: 'fromSQL',
    value: function fromSQL(sql) {
      this._query.sql = sql;

      return this;
    }
  }, {
    key: 'getJoins',
    value: function getJoins() {
      var joinStr = '';
      this._query.joins.forEach(function (join) {
        var table = join.table,
            alias = join.alias;

        joinStr += ' INNER JOIN ' + table + (alias ? ' AS ' + alias : '');
      });

      return joinStr;
    }
  }, {
    key: 'getOptions',
    value: function getOptions() {
      return this.options;
    }
  }, {
    key: 'groupBy',
    value: function groupBy() {
      var _this2 = this;

      var _groupBy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      (Array.isArray(_groupBy) && _groupBy || [_groupBy]).forEach(function (s) {
        if (s) {
          _this2._query.groupBy.push(s);
        }
      });

      return this;
    }
  }, {
    key: 'join',
    value: function join(table, alias) {
      this._query.joins.push({
        table: table, alias: alias
      });

      return this;
    }
  }, {
    key: 'limit',
    value: function limit(num) {
      this._query.limit = num;

      return this;
    }
  }, {
    key: 'orderBy',
    value: function orderBy() {
      var _this3 = this;

      var _orderBy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      (Array.isArray(_orderBy) && _orderBy || [_orderBy]).forEach(function (s) {
        if (s) {
          _this3._query.orderBy.push(s);
        }
      });

      return this;
    }
  }, {
    key: 'select',
    value: function select() {
      var _this4 = this;

      var _select = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      (Array.isArray(_select) && _select || [_select]).forEach(function (s) {
        if (s) {
          _this4._query.select.push(s);
        }
      });

      return this;
    }
  }, {
    key: 'setDB',
    value: function setDB(alias) {
      this.db = db.get(alias);

      return this;
    }
  }, {
    key: 'setOptions',
    value: function setOptions(options) {
      message$1('extending query options', this.options, options);
      Object.assign(this.options, options || {});

      message$1('extended query options', this.options);
      return this;
    }
  }, {
    key: 'setPortfolio',
    value: function setPortfolio(id) {
      this.portfolioID = parseInt(id);
      if (id) {
        this.where('pUID = ' + id);
      }

      return this;
    }
  }, {
    key: 'setWell',
    value: function setWell(id) {
      if (id && parseInt(id)) {
        this.where('wUID = ' + id);
      }

      return this;
    }
  }, {
    key: 'toSQL',
    value: function toSQL() {
      var _query2 = this._query,
          select = _query2.select,
          where = _query2.where,
          from = _query2.from,
          sql = _query2.sql,
          limit = _query2.limit,
          groupBy = _query2.groupBy,
          orderBy = _query2.orderBy;

      var joins = this.getJoins();

      select = select.length ? select.join(', ') : '*';
      groupBy = groupBy.length ? 'GROUP BY ' + groupBy.join(', ') : '';
      orderBy = orderBy.length ? 'ORDER BY ' + orderBy.join(', ') : '';
      where = where.length ? 'WHERE ' + where.join(' AND ') : '';
      limit = limit ? 'LIMIT ' + limit : '';

      sql = sql || 'SELECT ' + select + ' FROM ' + from + ' ' + joins + ' ' + where + ' ' + groupBy + ' ' + orderBy + ' ' + limit;

      // sql = sql.replace(/^SELECT/,'SELECT SQL_NO_CACHE')

      message$1('toSQL() =>', sql);

      return sql;
    }
  }, {
    key: 'where',
    value: function where(condition) {
      var where = this._query.where;

      where.push(condition);

      return this;
    }
  }]);
  return QueryBuilder;
}();

var consoleFunctions = (function (target, writeFunction) {
  target.write = process.stdout.write.bind(process.stdout);

  target.tally = function (value, label) {
    writeFunction('\x1b[0;32m' + value + '\x1b[0;37m ' + label);
  };

  target.header = function (label) {
    process.stdout.write('\n' + label.bold.white + '\n\n');
  };

  target.task = function (label) {
    process.stdout.write(label + '... ');
  };

  target.complete = function () {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'OK';
    var err = arguments[1];

    process.stdout.write(message.green + '\n');
  };

  target.incomplete = function (message) {
    process.stdout.write('FAIL'.red + '\n');
    if (message) {
      console.log(message.yellow + '\n');
    }
  };

  target.warn = function (message) {
    console.log(message.yellow);
  };

  target.error = function (message) {
    return console.log(message.red);
  };
});

var debug$1 = require('debug')('users');
var HASH_SECRET$2 = '80% accuracy at the speed of light';

// ADD CONSOLE FUNCTIONS
consoleFunctions(console, console.log);

// FILTERS & SUCH
var hash = function hash(obj) {
  var bf = new Blowfish(HASH_SECRET$2 + obj.username);
  return bf.encrypt(JSON.stringify(obj));
};
var sqlize = function sqlize(value) {
  return typeof value === 'string' ? SqlString.escape(value) : value;
};
var sqlizeDate = function sqlizeDate(date) {
  return date.toISOString().slice(0, 19).replace('T', ' ');
};

var create = function create(user, cb) {
  // FILL OUT HASHED COLUMNS
  user.password = hash({ username: user.username, password: user.password });

  var qb = new QueryBuilder();
  var keys = Object.keys(user);
  var values = keys.map(function (key) {
    return sqlize(user[key]);
  }).join(', ');
  var sql = 'INSERT INTO ' + appConfig.users.table + ' (' + keys.join(', ') + ') VALUES (' + values + ')';

  qb.setDB(appConfig.users.database).query(sql, function (err, data) {
    if (err) {
      cb(err);
    } else {
      cb(null, { success: true });
    }
  });
};

var getUser = function getUser(user, cb) {
  var qb = new QueryBuilder();
  var params = ['username', 'email'];
  var canMatch = false;

  qb.setDB(appConfig.users.database).from(appConfig.users.table);

  debug$1('getting user', user);

  params.forEach(function (param) {
    var value = user[param];

    if (value) {
      canMatch = true;
      qb.where(param + ' = \'' + value + '\'');
    }
  });

  if (!canMatch) return cb({ message: 'user lookup requires a username or email address' });

  qb.execute(function (err, results) {
    if (err) {
      return cb(err);
    }

    try {
      var user = Object.assign({}, results);
      cb(null, user);
    } catch (err) {
      cb(err, null);
    }
  });
};



var validate = function validate(userData, cb) {
  var username = userData.username,
      password = userData.password,
      company = userData.company,
      email = userData.email;


  getUser(userData, function (err, user) {
    if (err) {
      return cb({ message: 'invalid login', details: err });
    }
    debug$1('validating', user);

    var pwd = hash({ username: username, password: password });

    if (user.password === pwd) {
      // valid user!  update last accessed
      var now = sqlizeDate(new Date());
      var updateSQL = 'UPDATE ' + appConfig.users.table + ' SET dateLastAccessed = \'' + now + '\' WHERE id = \'' + user.id + '\'';
      var qb = new QueryBuilder();

      qb.setDB(appConfig.users.database).query(updateSQL, function (err) {
        if (err) {
          throw new Error(err);
        }

        delete user.password;
        cb(null, user);
      });
    } else {
      cb({ message: 'invalid login' });
    }
  });
};

var users = {
  create: create, validate: validate, getUser: getUser
};

var commandCreateUser = function () {
  var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var username, password, company, portfolios;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.header('creating user...');
            _context.next = 3;
            return prompt('username: ');

          case 3:
            username = _context.sent;
            _context.next = 6;
            return prompt('password: ');

          case 6:
            password = _context.sent;
            _context.next = 9;
            return prompt('company: ');

          case 9:
            company = _context.sent;
            _context.next = 12;
            return prompt('portfolios (comma-delimited): ');

          case 12:
            portfolios = _context.sent;

            create({ username: username, password: password, company: company, portfolios: portfolios }, function (err, user) {
              if (!err) {
                debug$1('OK!');
              } else {
                debug$1('ERROR', err);
              }
            });

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function commandCreateUser() {
    return _ref.apply(this, arguments);
  };
}();

var commandValidateUser = function () {
  var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var username, password;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            debug$1('validating user...\n');
            _context2.next = 3;
            return prompt('username: ');

          case 3:
            username = _context2.sent;
            _context2.next = 6;
            return prompt('password: ');

          case 6:
            password = _context2.sent;

            validate({ username: username, password: password }, function (err, user) {
              if (!err) {
                debug$1('OK!');
              } else {
                debug$1('ERROR', err);
              }
            });

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function commandValidateUser() {
    return _ref2.apply(this, arguments);
  };
}();

var userCommands = process.argv.slice(2);
var availableCommands = {
  create: commandCreateUser,
  validate: commandValidateUser

  // EXECUTE USER COMMAND
};if (userCommands.length) {
  var command = availableCommands[userCommands[0]];
  command && command();
}

var app$2 = express();

// OKTA & BLOWFISH TOKEN ENCRYPTION
var HASH_SECRET$1 = 'lazard-demo v' + pkg.version;
var bf$1 = new Blowfish(HASH_SECRET$1);

// MESSAGING CONSTANTS
var messages = {
  AUTH_FAILURE: 'The username and password entered did not match our records.  Please try again.',
  NOT_LOGGED_IN: 'User not logged in.',
  LOGOUT_SUCCESS: 'User logged out successfully.',
  REQUIRES_LOGIN: 'Accessing this data requires user login.'
};

app$2.isEnabled = true;

// EXPOSED MIDDLEWARE: API calls should require authentication
app$2.isAuthenticated = function (req, res, next) {
  if (!app$2.isEnabled) return next(); // REMOVE*** authentication bypass
  var session$$1 = req.session;

  var _ref = session$$1 || {},
      user = _ref.user;

  if (!user || !user.id) {
    return res.status(403).json({ status: 403, success: false, error: messages.REQUIRES_LOGIN });
  }
  next();
};

// REUSABLE AUTHENTICATION RESPONSE
function authenticationFailure(res, detail) {
  return res.status(401).json({ status: 401, success: false, message: messages.AUTH_FAILURE, detail: detail });
}

app$2.get('/auth/sessions', function (req, res) {
  res.json(listSessions());
});

// RETURN LOGGED IN USER
app$2.get('/auth/user', function (req, res) {
  var user = req.session.user;

  return res.json(user);
});

// LOGS OUT CURRENT USER
app$2.use('/auth/logout', function (req, res) {
  var session$$1 = req.session;
  var user = session$$1.user;

  if (!user) {
    return res.status(500).json({ status: 500, message: messages.NOT_LOGGED_IN });
  }
  delete session$$1.user;
  res.json({ message: messages.LOGOUT_SUCCESS });
});

// AUTHENTICATE USER
app$2.use('/auth', function (req, res) {
  var responseStart = new Date();
  var _req$body = req.body,
      userid = _req$body.userid,
      userpwd = _req$body.userpwd,
      sessionid = _req$body.sessionid,
      token = _req$body.token;

  // UNSAFE: REMOVE BLOCK IN PRODUCTION: allows GET based login

  if (!userid && !sessionid) {
    userid = req.query.userid;
    userpwd = req.query.userpwd;
    sessionid = req.query.sessionid;
    token = req.query.token;
  }

  var resumedSession = resumeSession(sessionid);

  if (resumedSession) {
    return res.json(resumedSession);
  }

  if (!userid || !userpwd) {
    if (token) {
      try {
        token = bf$1.decrypt(token);
        token = JSON.parse(token);
        userid = token.userid;
        userpwd = token.userpwd;
        if (new Date(token.expires) < new Date()) {
          return res.status(401).json({ status: 401, success: false, error: 'Attempted relogin using expired token' });
        }
      } catch (err) {
        console.log(err.message);
        return res.status(401).json({ status: 401, success: false, error: 'Attempted relogin using invalid token' });
      }
    }
  }

  if (!userid || !userpwd) {
    return authenticationFailure(res, 'Missing username or password');
  }

  users.validate({
    username: userid,
    password: userpwd
  }, function (err, userData) {
    if (err) {
      return authenticationFailure(res, err);
    }

    var user = {
      id: userData.username,
      name: userData.username,
      portfolios: userData.portfolios

      // embed user in request.session
    };req.session.user = createSession(user, { userid: userid, userpwd: userpwd });
    req.session.save();

    // send final response
    res.json(user);
  });
});

// create express app
// import moment and plugins
require('moment-precise-range-plugin');

// import package.json
var pkg$1 = require('../package.json');

var app$1 = express();
var serverStart = new Date();
var LOG_LIMIT = 5000;

var log = [];
var requestsServed = 0;

function shouldBeLogged(req) {
  if (req.originalUrl.indexOf('/cache') !== -1) return false;
  if (req.path.indexOf('/status') !== -1) return false;
  if (req.path.indexOf('favicon') !== -1) return false;
  return true;
}

app$1.use('*', function (req, res, next) {
  var start = new Date();
  requestsServed++;

  res.__endFromLogger = res.end;

  res.end = function () {
    res.logEntry = {
      url: req.protocol + '://' + req.get('host') + req.originalUrl,
      status: res.statusCode,
      date: new Date(),
      time: new Date() - start
    };

    if (res._headers['apicache-store']) {
      res.logEntry.fromCache = true;
    }

    if (shouldBeLogged(req)) {
      // add logEntry to beginning of log
      log.unshift(res.logEntry);

      // preserve first LOG_LIMIT entries
      log.splice(LOG_LIMIT);
    }

    res.__endFromLogger.apply(res, arguments);
  };

  next();
});

app$1.get('/status', app$2.isAuthenticated, function (req, res) {
  var urlPrefix = req.protocol + '://' + req.get('host');
  var groups = apicache.getIndex().groups;

  res.json({
    description: pkg$1.description,
    version: pkg$1.version,
    uptime: {
      numeric: new Date() - serverStart,
      string: moment.preciseDiff(moment(serverStart), moment(new Date()))
    },
    cacheControl: {
      view: urlPrefix + '/cache/index',
      clear: {
        all: urlPrefix + '/cache/clear',
        groups: Object.keys(groups).reduce(function (list, groupName) {
          list[groupName] = urlPrefix + '/cache/clear/' + groupName;

          return list;
        }, {})
      }
    },
    requests: {
      served: requestsServed,
      currentlyCached: apicache.getIndex().all.length
    },
    log: log.slice(0, req.query.limit || LOG_LIMIT)
  });
});

// setup initial API middleware on all /spa/ routes
app$1.get('/cache/index', app$2.isAuthenticated, function (req, res, next) {
  return res.send(apicache.getIndex());
});

app$1.get('/cache/clear/:key?', app$2.isAuthenticated, function (req, res, next) {
  apicache.clear(req.params.key);

  return res.send(apicache.getIndex());
});

// import odb from './../../models/odb'

var app$3 = express();

// First sample route to query db
app$3.get('/get_all', function (req, res) {
  // odb.findAll(collection, query, (err, doc) => {
  //   if(err) {
  //     console.log('do something here', err)
  //     res.status(500).send()
  //   } else {
  //     res.json(doc)
  //   }
  // })
  res.end();
});

// CONFIG & ENVIRONMENT
var env = "production" || 'dev';
var isProduction = env === 'production';

var PORT = process.env.PORT || 3008;

// INITIALIZE APP SERVER
console.log('initializing ' + pkg.description + ' server in ' + env + ' mode...');
var app = express();

// ENABLE GZIP COMPRESSION
// app.use(compression())

// ENABLE USER SESSIONS
app.use(session({
  name: 'server-session-cookie-id',
  secret: 'kitty cat of kittens',
  saveUninitialized: true,
  resave: true
}));

// ENABLED FORM BODY PARSING
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

// ENABLE OUTPUT LOGGING
app.use(morgan('dev'));

// ENABLE SESSION REFRESHING ON REQUEST
app.use(autoRefreshSession);

// ENABLE STATIC CONTENT DELIVERY
app.use(express.static(path.join(__dirname, !isProduction ? '../dist-dev/client' : '/client')));
// app.use(express.static(path.join(__dirname, (!isProduction ? '../dist/images' : '/client'))))

// ENABLE AUTHENTICATION
app.use(app$2);

// ENABLE LOGGING AND CACHE CONTROL
app.use(app$1);

app.use('/api', app$3);
// VERSION & PACKAGE CHECKING
app.get('/version', function (req, res) {
  var name$$1 = pkg.name,
      version$$1 = pkg.version,
      description$$1 = pkg.description;
  var title = appConfig.title;

  res.json({ name: name$$1, title: title, description: description$$1, version: version$$1, deployed: new Date() });
});

// CREATE HTTP SERVER
var httpServer = app.listen(PORT, function () {
  console.log('HTTP server listening on port ' + httpServer.address().port);
});
//# sourceMappingURL=index.js.map
