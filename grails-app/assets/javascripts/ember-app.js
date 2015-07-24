/* jshint ignore:start */

/* jshint ignore:end */

define('ember-app/adapters/application', ['exports', 'ember-data'], function (exports, DS) {

    'use strict';

    exports['default'] = DS['default'].RESTAdapter.extend({
        namespace: 'api',
        host: 'http://localhost:8080',
        ajax: function ajax(url, method, hash) {
            hash.crossDomain = true;
            hash.xhrFields = { withCredentials: false };
            return this._super(url, method, hash);
        }
    });

});
define('ember-app/adapters/workspace', ['exports', 'ember-data'], function (exports, DS) {

    'use strict';

    exports['default'] = DS['default'].RESTAdapter.extend({
        namespace: 'api/users',
        host: 'http://localhost:8080',

        urlForQuery: function urlForQuery(query, modelName) {
            var url = [this.host, this.namespace, query.user, Ember.String.pluralize(modelName)];
            delete query.user;

            url = url.join('/');
            if (!this.host && url && url.charAt(0) !== '/') {
                url = '/' + url;
            }

            return url;
        }
    });

});
define('ember-app/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'ember-app/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('ember-app/controllers/admin-numbers', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    isEditing: false,

    actions: {
      edit: function edit() {
        this.set('isEditing', !this.isEditing);
      }
    }
  });

});
define('ember-app/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('ember-app/controllers/dashboard', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Controller.extend({
        navigatorVisible: "",
        isShowSiteControl: false,
        currentSite: "Site...",
        actions: {
            showMissionControl: function showMissionControl() {
                this.set('navigatorVisible', this.navigatorVisible == "" ? "navigator-visible" : "");
            },
            showSiteControl: function showSiteControl() {
                this.set('isShowSiteControl', !this.isShowSiteControl);
            },
            selectSite: function selectSite(value) {
                this.set('currentSite', value);
                this.set('isShowSiteControl', false);
            }
        }
    });

});
define('ember-app/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('ember-app/initializers/export-application-global', ['exports', 'ember', 'ember-app/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('ember-app/instance-initializers/app-version', ['exports', 'ember-app/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('ember-app/models/ad-source', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    name: DS['default'].attr('string'),
    description: DS['default'].attr('string'),
    site: DS['default'].belongsTo('site')
  });

});
define('ember-app/models/call', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    date: DS['default'].attr('date'),
    duration: DS['default'].attr('number'),
    aimed: DS['default'].attr('boolean'),
    number: DS['default'].belongsTo('number')
  });

});
define('ember-app/models/campaign', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    name: DS['default'].attr('string'),
    details: DS['default'].attr('string'),
    site: DS['default'].belongsTo('site'),
    number: DS['default'].hasMany('number')
  });

});
define('ember-app/models/number', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    upid: DS['default'].attr('string')
  });

});
define('ember-app/models/site', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    name: DS['default'].attr('string'),
    details: DS['default'].attr('string'),
    workspace: DS['default'].belongsTo('workspace'),
    adSources: DS['default'].hasMany('adSource'),
    campaigns: DS['default'].hasMany('campaign')
  });

});
define('ember-app/models/user', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    uid: DS['default'].attr('string'),
    workplaces: DS['default'].hasMany('workplace')
  });

});
define('ember-app/models/workspace', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    sites: DS['default'].hasMany('site'),
    owner: DS['default'].belongsTo('user'),
    myNumber: DS['default'].hasMany('number')
  });

});
define('ember-app/router', ['exports', 'ember', 'ember-app/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('dashboard', { path: '/dashboard' }, function () {
      this.route('workspaces', function () {
        this.route('settings');
        this.route('access');
      });
    });

    this.route('dashboard', { path: '/dashboard/:uid' }, function () {
      this.route('pbx', function () {
        this.route('numbers', { path: '/numbers' });
      });
      this.route('reports', function () {
        this.route('report-one');
        this.route('report-two');
        this.route('report-three');
      });
      this.route('analytics', function () {
        this.route('campaigns');
        this.route('adsources');
      });
      this.route('sites', { path: '/sitez' });
    });
    this.route('admin', function () {
      this.route('numbers');
      this.route('users');
    });
  });

  exports['default'] = Router;

});
define('ember-app/routes/admin-numbers', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return this.store.findAll('number');
    }
  });

});
define('ember-app/routes/admin-users', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return this.store.findAll('user');
    }
  });

});
define('ember-app/routes/dashboard-pbx-numbers', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return this.store.findAll('number');
    }
  });

});
define('ember-app/routes/dashboard', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model(params) {
      console.log(params);
      return this.store.query('workspace', { user: params.uid });
    }

  });

});
define('ember-app/routes/dashboard/pbx/numbers', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return this.store.findAll('number');
    }
  });

});
define('ember-app/templates/admin', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 36,
              "column": 24
            },
            "end": {
              "line": 39,
              "column": 24
            }
          },
          "moduleName": "ember-app/templates/admin.handlebars"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1,"class","icon icon-sub-nav-resources");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n                            Numbers\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 43,
              "column": 24
            },
            "end": {
              "line": 46,
              "column": 24
            }
          },
          "moduleName": "ember-app/templates/admin.handlebars"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1,"class","icon icon-sub-nav-resources");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n                            Users\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 61,
            "column": 0
          }
        },
        "moduleName": "ember-app/templates/admin.handlebars"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","app-wrapper ");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","alert alert-danger text-center offline-status");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("There's a problem connecting…\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"class","btn btn-link");
        var el6 = dom.createTextNode("Refresh");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","flash-messages");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","sidebar scrollable-container");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"id","sidebar");
        dom.setAttribute(el4,"class","sidebar-wrapper");
        var el5 = dom.createTextNode("\n\n\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","sidebar-container property-switcher fixed-top allow-if-delinquent");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("a");
        dom.setAttribute(el6,"href","/");
        var el7 = dom.createElement("i");
        dom.setAttribute(el7,"class","icon icon-logo dashboard-logo");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("h4");
        dom.setAttribute(el7,"class","dashboard-logo-text");
        var el8 = dom.createTextNode("Admin Panel");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","navigator-toggle icon icon-navigator-toggle");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","main-panel scrollable-container container-fluid snap-main-panel");
        var el4 = dom.createTextNode("\n\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","main-content");
        var el5 = dom.createTextNode("\n\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","nav nav-tabs sub-nav app-nav");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","sub-nav-item");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("                    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","sub-nav-item");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("                    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1, 7]);
        var element2 = dom.childAt(element1, [3]);
        var element3 = dom.childAt(element2, [1]);
        var morphs = new Array(5);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createMorphAt(element1,1,1);
        morphs[2] = dom.createMorphAt(dom.childAt(element3, [1]),1,1);
        morphs[3] = dom.createMorphAt(dom.childAt(element3, [3]),1,1);
        morphs[4] = dom.createMorphAt(element2,3,3);
        return morphs;
      },
      statements: [
        ["attribute","class",["concat",["dashboard-wrapper protected-app-resources ",["get","isShowMissionControl",["loc",[null,[1,56],[1,76]]]],":navigator-visible"]]],
        ["inline","partial",["snippets/top-nav"],[],["loc",[null,[30,12],[30,42]]]],
        ["block","link-to",["admin.numbers"],[],0,null,["loc",[null,[36,24],[39,36]]]],
        ["block","link-to",["admin.users"],[],1,null,["loc",[null,[43,24],[46,36]]]],
        ["content","outlet",["loc",[null,[51,16],[51,26]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('ember-app/templates/admin/numbers', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 12
            },
            "end": {
              "line": 24,
              "column": 12
            }
          },
          "moduleName": "ember-app/templates/admin/numbers.handlebars"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","btn btn-sm btn-link cancel-edit-button");
          dom.setAttribute(el1,"type","button");
          var el2 = dom.createTextNode("\n                    Cancel\n                ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","btn btn-sm btn-primary save-button");
          dom.setAttribute(el1,"type","button");
          var el2 = dom.createTextNode("\n                    Save\n                ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var element2 = dom.childAt(fragment, [3]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element1);
          morphs[1] = dom.createElementMorph(element2);
          return morphs;
        },
        statements: [
          ["element","action",["edit"],[],["loc",[null,[15,71],[15,88]]]],
          ["element","action",["edit"],[],["loc",[null,[20,67],[20,84]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 24,
              "column": 12
            },
            "end": {
              "line": 27,
              "column": 12
            }
          },
          "moduleName": "ember-app/templates/admin/numbers.handlebars"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","btn btn-sm btn-default edit-button");
          dom.setAttribute(el1,"type","button");
          var el2 = dom.createTextNode("Edit");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [
          ["element","action",["edit"],[],["loc",[null,[25,67],[25,84]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 37,
              "column": 16
            },
            "end": {
              "line": 49,
              "column": 16
            }
          },
          "moduleName": "ember-app/templates/admin/numbers.handlebars"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          dom.setAttribute(el1,"class","collaborator-item editable-item item-persisted");
          var el2 = dom.createTextNode("\n                        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n                            ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n                        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2,"class","collaborator-info  show-role");
          var el3 = dom.createTextNode("\n                        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n                        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2,"class","action-cell");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n                    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]),1,1);
          return morphs;
        },
        statements: [
          ["content","upid",["loc",[null,[40,28],[40,36]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 95,
            "column": 0
          }
        },
        "moduleName": "ember-app/templates/admin/numbers.handlebars"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","sticky-header");
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","group-header");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","apps-header flex-grow-1 flex");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"for","apps-filter");
        dom.setAttribute(el4,"class","icon icon-search");
        var el5 = dom.createTextNode("Search apps");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("input");
        dom.setAttribute(el4,"placeholder","Search Existing Numbers");
        dom.setAttribute(el4,"class","ember-view form-control filter mousetrap");
        dom.setAttribute(el4,"id","apps-filter");
        dom.setAttribute(el4,"type","text");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","ember-view feature-container feature-is-disabled");
        dom.setAttribute(el4,"id","ember756");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","pull-right");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","editable-table-component table-responsive");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("table");
        dom.setAttribute(el4,"class","table editable-list domain-list");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("tbody");
        var el6 = dom.createTextNode("\n\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("tr");
        dom.setAttribute(el6,"class","ember-view domain-item editable-item item-added");
        dom.setAttribute(el6,"id","ember2456");
        var el7 = dom.createTextNode("\n                    ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("td");
        var el8 = dom.createTextNode("\n                        0931326201\n                    ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n                    ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("td");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n\n                    ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("td");
        dom.setAttribute(el7,"class","action-cell text-right");
        var el8 = dom.createTextNode("\n                        ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("button");
        dom.setAttribute(el8,"data-ember-action","2459");
        dom.setAttribute(el8,"class","btn-link undo-item");
        dom.setAttribute(el8,"type","button");
        var el9 = dom.createTextNode("\n                            ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("i");
        dom.setAttribute(el9,"class","icon icon-undo");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                        ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                    ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n                ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("tr");
        dom.setAttribute(el6,"class","ember-view domain-item editable-item item-added item-new");
        var el7 = dom.createTextNode("\n                    ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("td");
        var el8 = dom.createTextNode("\n                        ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8,"class","ember-view form-group");
        var el9 = dom.createElement("input");
        dom.setAttribute(el9,"placeholder","yourdomain.com");
        dom.setAttribute(el9,"class","ember-view ember-text-field form-control new-domain");
        dom.setAttribute(el9,"type","text");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n\n                        ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                    ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n                    ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("td");
        var el8 = dom.createTextNode("\n\n                    ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n                    ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("td");
        dom.setAttribute(el7,"class","action-cell text-right");
        var el8 = dom.createTextNode("\n\n                        ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("button");
        dom.setAttribute(el8,"class","btn-link add-item");
        dom.setAttribute(el8,"type","submit");
        var el9 = dom.createTextNode("\n                            ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("i");
        dom.setAttribute(el9,"class","icon icon-add");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                        ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n\n                    ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n                ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element3 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(element3, [1, 3]),1,1);
        morphs[1] = dom.createMorphAt(dom.childAt(element3, [3, 1, 1, 1]),1,1);
        return morphs;
      },
      statements: [
        ["block","if",[["get","isEditing",["loc",[null,[14,18],[14,27]]]]],[],0,1,["loc",[null,[14,12],[27,19]]]],
        ["block","each",[["get","this",[]]],[],2,null,["loc",[null,[37,16],[49,25]]]]
      ],
      locals: [],
      templates: [child0, child1, child2]
    };
  }()));

});
define('ember-app/templates/admin/users', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 12
            },
            "end": {
              "line": 24,
              "column": 12
            }
          },
          "moduleName": "ember-app/templates/admin/users.handlebars"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","btn btn-sm btn-link cancel-edit-button");
          dom.setAttribute(el1,"type","button");
          var el2 = dom.createTextNode("\n                    Cancel\n                ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","btn btn-sm btn-primary save-button");
          dom.setAttribute(el1,"type","button");
          var el2 = dom.createTextNode("\n                    Save\n                ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var element2 = dom.childAt(fragment, [3]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element1);
          morphs[1] = dom.createElementMorph(element2);
          return morphs;
        },
        statements: [
          ["element","action",["edit"],[],["loc",[null,[15,71],[15,88]]]],
          ["element","action",["edit"],[],["loc",[null,[20,67],[20,84]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 24,
              "column": 12
            },
            "end": {
              "line": 27,
              "column": 12
            }
          },
          "moduleName": "ember-app/templates/admin/users.handlebars"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","btn btn-sm btn-default edit-button");
          dom.setAttribute(el1,"type","button");
          var el2 = dom.createTextNode("Edit");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [
          ["element","action",["edit"],[],["loc",[null,[25,67],[25,84]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 37,
              "column": 16
            },
            "end": {
              "line": 49,
              "column": 16
            }
          },
          "moduleName": "ember-app/templates/admin/users.handlebars"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          dom.setAttribute(el1,"class","collaborator-item editable-item item-persisted");
          var el2 = dom.createTextNode("\n                        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n                            ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n                        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2,"class","collaborator-info  show-role");
          var el3 = dom.createTextNode("\n                        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n                        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2,"class","action-cell");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n                    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]),1,1);
          return morphs;
        },
        statements: [
          ["content","uid",["loc",[null,[40,28],[40,35]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 95,
            "column": 0
          }
        },
        "moduleName": "ember-app/templates/admin/users.handlebars"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","sticky-header");
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","group-header");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","apps-header flex-grow-1 flex");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"for","apps-filter");
        dom.setAttribute(el4,"class","icon icon-search");
        var el5 = dom.createTextNode("Search apps");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("input");
        dom.setAttribute(el4,"placeholder","Search Existing Numbers");
        dom.setAttribute(el4,"class","ember-view form-control filter mousetrap");
        dom.setAttribute(el4,"id","apps-filter");
        dom.setAttribute(el4,"type","text");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","ember-view feature-container feature-is-disabled");
        dom.setAttribute(el4,"id","ember756");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","pull-right");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","editable-table-component table-responsive");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("table");
        dom.setAttribute(el4,"class","table editable-list domain-list");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("tbody");
        var el6 = dom.createTextNode("\n\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("tr");
        dom.setAttribute(el6,"class","ember-view domain-item editable-item item-added");
        dom.setAttribute(el6,"id","ember2456");
        var el7 = dom.createTextNode("\n                    ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("td");
        var el8 = dom.createTextNode("\n                        0931326201\n                    ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n                    ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("td");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n\n                    ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("td");
        dom.setAttribute(el7,"class","action-cell text-right");
        var el8 = dom.createTextNode("\n                        ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("button");
        dom.setAttribute(el8,"data-ember-action","2459");
        dom.setAttribute(el8,"class","btn-link undo-item");
        dom.setAttribute(el8,"type","button");
        var el9 = dom.createTextNode("\n                            ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("i");
        dom.setAttribute(el9,"class","icon icon-undo");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                        ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                    ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n                ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("tr");
        dom.setAttribute(el6,"class","ember-view domain-item editable-item item-added item-new");
        var el7 = dom.createTextNode("\n                    ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("td");
        var el8 = dom.createTextNode("\n                        ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8,"class","ember-view form-group");
        var el9 = dom.createElement("input");
        dom.setAttribute(el9,"placeholder","yourdomain.com");
        dom.setAttribute(el9,"class","ember-view ember-text-field form-control new-domain");
        dom.setAttribute(el9,"type","text");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n\n                        ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                    ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n                    ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("td");
        var el8 = dom.createTextNode("\n\n                    ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n                    ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("td");
        dom.setAttribute(el7,"class","action-cell text-right");
        var el8 = dom.createTextNode("\n\n                        ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("button");
        dom.setAttribute(el8,"class","btn-link add-item");
        dom.setAttribute(el8,"type","submit");
        var el9 = dom.createTextNode("\n                            ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("i");
        dom.setAttribute(el9,"class","icon icon-add");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                        ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n\n                    ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n                ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element3 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(element3, [1, 3]),1,1);
        morphs[1] = dom.createMorphAt(dom.childAt(element3, [3, 1, 1, 1]),1,1);
        return morphs;
      },
      statements: [
        ["block","if",[["get","isEditing",["loc",[null,[14,18],[14,27]]]]],[],0,1,["loc",[null,[14,12],[27,19]]]],
        ["block","each",[["get","this",[]]],[],2,null,["loc",[null,[37,16],[49,25]]]]
      ],
      locals: [],
      templates: [child0, child1, child2]
    };
  }()));

});
define('ember-app/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "ember-app/templates/application.handlebars"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('ember-app/templates/dashboard', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 35,
            "column": 0
          }
        },
        "moduleName": "ember-app/templates/dashboard.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","app-wrapper ");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","alert alert-danger text-center offline-status");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("There's a problem connecting…\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"class","btn btn-link");
        var el6 = dom.createTextNode("Refresh");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","flash-messages");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","sidebar scrollable-container");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"id","sidebar");
        dom.setAttribute(el4,"class","sidebar-wrapper");
        var el5 = dom.createTextNode("\n\n              ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n              ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n              ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","main-panel scrollable-container container-fluid snap-main-panel");
        var el4 = dom.createTextNode("\n\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [5, 1]);
        var morphs = new Array(5);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createMorphAt(element2,1,1);
        morphs[2] = dom.createMorphAt(element2,3,3);
        morphs[3] = dom.createMorphAt(element2,5,5);
        morphs[4] = dom.createMorphAt(dom.childAt(element1, [7]),1,1);
        return morphs;
      },
      statements: [
        ["attribute","class",["concat",["dashboard-wrapper protected-app-resources ",["get","navigatorVisible",["loc",[null,[1,56],[1,72]]]]]]],
        ["inline","partial",["snippets/workspace-control"],[],["loc",[null,[14,14],[14,54]]]],
        ["inline","partial",["snippets/site-section"],[],["loc",[null,[16,14],[16,49]]]],
        ["inline","partial",["snippets/navigation"],[],["loc",[null,[18,14],[18,47]]]],
        ["content","outlet",["loc",[null,[26,10],[26,20]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('ember-app/templates/dashboard/analytics', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 12
            },
            "end": {
              "line": 11,
              "column": 12
            }
          },
          "moduleName": "ember-app/templates/dashboard/analytics.handlebars"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1,"class","icon icon-sub-nav-resources");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n                Ad Sources\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 12
            },
            "end": {
              "line": 18,
              "column": 12
            }
          },
          "moduleName": "ember-app/templates/dashboard/analytics.handlebars"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1,"class","icon icon-sub-nav-resources");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n                Campaigns\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 25,
            "column": 6
          }
        },
        "moduleName": "ember-app/templates/dashboard/analytics.handlebars"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","main-content");
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","nav nav-tabs sub-nav app-nav");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","sub-nav-item");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","sub-nav-item");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(element0, [1]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]),1,1);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [3]),1,1);
        morphs[3] = dom.createMorphAt(element0,3,3);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["inline","render",["snippets.top-nav"],[],["loc",[null,[1,0],[1,29]]]],
        ["block","link-to",["dashboard.analytics.adsources"],[],0,null,["loc",[null,[8,12],[11,24]]]],
        ["block","link-to",["dashboard.analytics.campaigns"],[],1,null,["loc",[null,[15,12],[18,24]]]],
        ["content","outlet",["loc",[null,[23,4],[23,14]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('ember-app/templates/dashboard/pbx', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 12
            },
            "end": {
              "line": 12,
              "column": 12
            }
          },
          "moduleName": "ember-app/templates/dashboard/pbx.handlebars"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1,"class","icon icon-sub-nav-resources");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n                My Numbers\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 18,
            "column": 6
          }
        },
        "moduleName": "ember-app/templates/dashboard/pbx.handlebars"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","main-content");
        var el2 = dom.createTextNode("\n\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","nav nav-tabs sub-nav app-nav");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","sub-nav-item");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [1, 1]),1,1);
        morphs[2] = dom.createMorphAt(element0,3,3);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["inline","render",["snippets.top-nav"],[],["loc",[null,[1,0],[1,29]]]],
        ["block","link-to",["dashboard.pbx.numbers"],[],0,null,["loc",[null,[9,12],[12,24]]]],
        ["content","outlet",["loc",[null,[16,4],[16,14]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('ember-app/templates/dashboard/pbx/numbers', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 17,
              "column": 16
            },
            "end": {
              "line": 29,
              "column": 16
            }
          },
          "moduleName": "ember-app/templates/dashboard/pbx/numbers.handlebars"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          dom.setAttribute(el1,"class","collaborator-item editable-item item-persisted");
          var el2 = dom.createTextNode("\n                        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n                            ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n                        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2,"class","collaborator-info  show-role");
          var el3 = dom.createTextNode("\n                        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n                        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2,"class","action-cell");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n                    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]),1,1);
          return morphs;
        },
        statements: [
          ["content","item.upid",["loc",[null,[20,28],[20,41]]]]
        ],
        locals: ["item"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 75,
            "column": 0
          }
        },
        "moduleName": "ember-app/templates/dashboard/pbx/numbers.handlebars"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","sticky-header");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","group-header");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h5");
        var el4 = dom.createTextNode("Numbers");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","pull-right");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","btn btn-sm btn-default edit-button edit-button");
        dom.setAttribute(el4,"type","button");
        var el5 = dom.createTextNode("\n                Edit\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","editable-table-component table-responsive");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("table");
        dom.setAttribute(el4,"class","table editable-list domain-list");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("tbody");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("tr");
        dom.setAttribute(el6,"class","ember-view domain-item editable-item item-added");
        dom.setAttribute(el6,"id","ember2456");
        var el7 = dom.createTextNode("\n                    ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("td");
        var el8 = dom.createTextNode("\n                        0931326201\n                    ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n                    ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("td");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n\n                    ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("td");
        dom.setAttribute(el7,"class","action-cell text-right");
        var el8 = dom.createTextNode("\n                        ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("button");
        dom.setAttribute(el8,"data-ember-action","2459");
        dom.setAttribute(el8,"class","btn-link undo-item");
        dom.setAttribute(el8,"type","button");
        var el9 = dom.createTextNode("\n                            ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("i");
        dom.setAttribute(el9,"class","icon icon-undo");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                        ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                    ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n                ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("tr");
        dom.setAttribute(el6,"class","ember-view domain-item editable-item item-added item-new");
        var el7 = dom.createTextNode("\n                    ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("td");
        var el8 = dom.createTextNode("\n                        ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8,"class","ember-view form-group");
        var el9 = dom.createElement("input");
        dom.setAttribute(el9,"placeholder","yourdomain.com");
        dom.setAttribute(el9,"class","ember-view ember-text-field form-control new-domain");
        dom.setAttribute(el9,"type","text");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n\n                        ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                    ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n                    ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("td");
        var el8 = dom.createTextNode("\n\n                    ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n                    ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("td");
        dom.setAttribute(el7,"class","action-cell text-right");
        var el8 = dom.createTextNode("\n\n                        ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("button");
        dom.setAttribute(el8,"class","btn-link add-item");
        dom.setAttribute(el8,"type","submit");
        var el9 = dom.createTextNode("\n                            ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("i");
        dom.setAttribute(el9,"class","icon icon-add");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                        ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n\n                    ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n                ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 3, 1, 1, 1]),1,1);
        return morphs;
      },
      statements: [
        ["block","each",[["get","model",["loc",[null,[17,32],[17,37]]]]],[],0,null,["loc",[null,[17,16],[29,25]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('ember-app/templates/dashboard/reports', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 12
            },
            "end": {
              "line": 11,
              "column": 12
            }
          },
          "moduleName": "ember-app/templates/dashboard/reports.handlebars"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1,"class","icon icon-sub-nav-resources");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n                Report One\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 12
            },
            "end": {
              "line": 18,
              "column": 12
            }
          },
          "moduleName": "ember-app/templates/dashboard/reports.handlebars"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1,"class","icon icon-sub-nav-resources");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n                Report Two\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 22,
              "column": 12
            },
            "end": {
              "line": 25,
              "column": 12
            }
          },
          "moduleName": "ember-app/templates/dashboard/reports.handlebars"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1,"class","icon icon-sub-nav-resources");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n                Report Three\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 33,
            "column": 6
          }
        },
        "moduleName": "ember-app/templates/dashboard/reports.handlebars"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","main-content");
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","nav nav-tabs sub-nav app-nav");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","sub-nav-item");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","sub-nav-item");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","sub-nav-item");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(element0, [1]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]),1,1);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [3]),1,1);
        morphs[3] = dom.createMorphAt(dom.childAt(element1, [5]),1,1);
        morphs[4] = dom.createMorphAt(element0,3,3);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["inline","render",["snippets.top-nav"],[],["loc",[null,[1,0],[1,29]]]],
        ["block","link-to",["dashboard.reports.report-one"],[],0,null,["loc",[null,[8,12],[11,24]]]],
        ["block","link-to",["dashboard.reports.report-two"],[],1,null,["loc",[null,[15,12],[18,24]]]],
        ["block","link-to",["dashboard.reports.report-three"],[],2,null,["loc",[null,[22,12],[25,24]]]],
        ["content","outlet",["loc",[null,[31,4],[31,14]]]]
      ],
      locals: [],
      templates: [child0, child1, child2]
    };
  }()));

});
define('ember-app/templates/dashboard/reports/report-one', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 0
          }
        },
        "moduleName": "ember-app/templates/dashboard/reports/report-one.handlebars"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('ember-app/templates/dashboard/reports/report-three', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 0
          }
        },
        "moduleName": "ember-app/templates/dashboard/reports/report-three.handlebars"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('ember-app/templates/dashboard/reports/report-two', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 0
          }
        },
        "moduleName": "ember-app/templates/dashboard/reports/report-two.handlebars"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('ember-app/templates/dashboard/sites', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 12
            },
            "end": {
              "line": 11,
              "column": 12
            }
          },
          "moduleName": "ember-app/templates/dashboard/sites.handlebars"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1,"class","icon icon-sub-nav-resources");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n                Sites\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 18,
            "column": 6
          }
        },
        "moduleName": "ember-app/templates/dashboard/sites.handlebars"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","main-content");
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","nav nav-tabs sub-nav app-nav");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","sub-nav-item");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [1, 1]),1,1);
        morphs[2] = dom.createMorphAt(element0,3,3);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["inline","render",["snippets.top-nav"],[],["loc",[null,[1,0],[1,29]]]],
        ["block","link-to",["dashboard.sites"],[],0,null,["loc",[null,[8,12],[11,24]]]],
        ["content","outlet",["loc",[null,[16,4],[16,14]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('ember-app/templates/dashboard/workspaces', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 12
            },
            "end": {
              "line": 11,
              "column": 12
            }
          },
          "moduleName": "ember-app/templates/dashboard/workspaces.handlebars"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1,"class","icon icon-sub-nav-settings");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n                Settings\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 12
            },
            "end": {
              "line": 18,
              "column": 12
            }
          },
          "moduleName": "ember-app/templates/dashboard/workspaces.handlebars"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1,"class","icon icon-sub-nav-access");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n                Access\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 27,
            "column": 6
          }
        },
        "moduleName": "ember-app/templates/dashboard/workspaces.handlebars"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","main-content");
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","nav nav-tabs sub-nav app-nav");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","sub-nav-item");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","sub-nav-item");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n\n\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(element0, [1]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]),1,1);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [3]),1,1);
        morphs[3] = dom.createMorphAt(element0,3,3);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["inline","render",["snippets.top-nav"],[],["loc",[null,[1,0],[1,29]]]],
        ["block","link-to",["dashboard.workspaces.settings"],[],0,null,["loc",[null,[8,12],[11,24]]]],
        ["block","link-to",["dashboard.workspaces.access"],[],1,null,["loc",[null,[15,12],[18,24]]]],
        ["content","outlet",["loc",[null,[25,4],[25,14]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('ember-app/templates/dashboard/workspaces/access', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 0
          }
        },
        "moduleName": "ember-app/templates/dashboard/workspaces/access.handlebars"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('ember-app/templates/dashboard/workspaces/settings', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 0
          }
        },
        "moduleName": "ember-app/templates/dashboard/workspaces/settings.handlebars"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('ember-app/templates/snippets/navigation', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 20
            },
            "end": {
              "line": 11,
              "column": 20
            }
          },
          "moduleName": "ember-app/templates/snippets/navigation.handlebars"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1,"class","icon icon-personal-apps");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n                        Reports\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 20
            },
            "end": {
              "line": 19,
              "column": 20
            }
          },
          "moduleName": "ember-app/templates/snippets/navigation.handlebars"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1,"class","icon icon-personal-apps");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n                        PBX\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 24,
              "column": 20
            },
            "end": {
              "line": 27,
              "column": 20
            }
          },
          "moduleName": "ember-app/templates/snippets/navigation.handlebars"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1,"class","icon icon-personal-apps");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n                        Analytics\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child3 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 39,
              "column": 20
            },
            "end": {
              "line": 42,
              "column": 20
            }
          },
          "moduleName": "ember-app/templates/snippets/navigation.handlebars"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1,"class","icon icon-personal-apps");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n                        Sites\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child4 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 45,
              "column": 20
            },
            "end": {
              "line": 48,
              "column": 20
            }
          },
          "moduleName": "ember-app/templates/snippets/navigation.handlebars"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1,"class","icon icon-personal-apps");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n                        Workspaces\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 55,
            "column": 6
          }
        },
        "moduleName": "ember-app/templates/snippets/navigation.handlebars"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","sidebar-container scrollable-content");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","shortcuts");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h6");
        var el4 = dom.createTextNode("Application");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","personal-apps");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4,"class","sidebar-nav");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        dom.setAttribute(el5,"class","group-menu-item active");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4,"class","sidebar-nav");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        dom.setAttribute(el5,"class","group-menu-item active");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4,"class","sidebar-nav");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        dom.setAttribute(el5,"class","group-menu-item active");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","shortcuts");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h6");
        var el4 = dom.createTextNode("Settings");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","personal-apps");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4,"class","sidebar-nav");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        dom.setAttribute(el5,"class","group-menu-item ");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        dom.setAttribute(el5,"class","group-menu-item ");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1, 3]);
        var element2 = dom.childAt(element0, [3, 3, 1]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1, 1]),1,1);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [3, 1]),1,1);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [5, 1]),1,1);
        morphs[3] = dom.createMorphAt(dom.childAt(element2, [1]),1,1);
        morphs[4] = dom.createMorphAt(dom.childAt(element2, [3]),1,1);
        return morphs;
      },
      statements: [
        ["block","link-to",["dashboard.reports"],["class","sidebar-nav-heading org"],0,null,["loc",[null,[8,20],[11,32]]]],
        ["block","link-to",["dashboard.pbx"],["class","sidebar-nav-heading org"],1,null,["loc",[null,[16,20],[19,32]]]],
        ["block","link-to",["dashboard.analytics"],["class","sidebar-nav-heading org"],2,null,["loc",[null,[24,20],[27,32]]]],
        ["block","link-to",["dashboard.sites"],["class","sidebar-nav-heading org"],3,null,["loc",[null,[39,20],[42,32]]]],
        ["block","link-to",["dashboard.workspaces"],["class","sidebar-nav-heading org"],4,null,["loc",[null,[45,20],[48,32]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3, child4]
    };
  }()));

});
define('ember-app/templates/snippets/site-section', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 28,
            "column": 0
          }
        },
        "moduleName": "ember-app/templates/snippets/site-section.handlebars"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","account allow-if-delinquent");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","sidebar-container");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","#");
        dom.setAttribute(el4,"class","dropdown-toggle");
        var el5 = dom.createTextNode("\n                                    ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","avatar");
        var el6 = dom.createTextNode("\n                                        ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("img");
        dom.setAttribute(el6,"class","gravatar-icon");
        dom.setAttribute(el6,"src","https://gravatar.com/avatar/f94a08169caa7c95ee3f22c897854051?s=96&d=https://dashboard.heroku.com%2Fimages%2Fstatic%2Fninja-avatar-48x48.png");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n                                        ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","notification-badge ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                                    ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","media-body sidebar-user-email");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("h5");
        dom.setAttribute(el6,"class","media-heading");
        var el7 = dom.createTextNode("\n                      ");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("  Site\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("i");
        dom.setAttribute(el7,"class","icon icon-caret");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4,"class","dropdown-menu user-menu list-group");
        var el5 = dom.createTextNode("\n\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createElement("a");
        dom.setAttribute(el6,"href","#");
        var el7 = dom.createTextNode("macchiatow.org");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createElement("a");
        dom.setAttribute(el6,"href","#");
        var el7 = dom.createTextNode("dobromed-m.ru");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1, 1]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element0, [3]);
        var element3 = dom.childAt(element2, [1, 0]);
        var element4 = dom.childAt(element2, [3, 0]);
        var morphs = new Array(5);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createElementMorph(element1);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [3, 1]),1,1);
        morphs[3] = dom.createElementMorph(element3);
        morphs[4] = dom.createElementMorph(element4);
        return morphs;
      },
      statements: [
        ["attribute","class",["concat",["sidebar-user-section media dropdown ",["get","isShowSiteControl:open",["loc",[null,[3,58],[3,80]]]]]]],
        ["element","action",["showSiteControl"],[],["loc",[null,[4,48],[4,76]]]],
        ["content","currentSite",["loc",[null,[15,22],[15,37]]]],
        ["element","action",["selectSite","macchiatow.org"],[],["loc",[null,[22,32],[22,72]]]],
        ["element","action",["selectSite","dobromed-m.ru"],[],["loc",[null,[23,32],[23,71]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('ember-app/templates/snippets/top-nav', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 6
          }
        },
        "moduleName": "ember-app/templates/snippets/top-nav.handlebars"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","top-nav");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"class","sidebar-toggle visible-sm visible-xs");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("i");
        dom.setAttribute(el3,"class","icon-hamburger icon");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","section-content ");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","app-header flex-grow-1 flex");
        var el4 = dom.createTextNode("\n\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","app-name-container flex-grow-1");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","app-name");
        var el6 = dom.createTextNode("My Best Company Name");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('ember-app/templates/snippets/workspace-control', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 11,
              "column": 12
            },
            "end": {
              "line": 18,
              "column": 12
            }
          },
          "moduleName": "ember-app/templates/snippets/workspace-control.handlebars"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1,"class","active");
          var el2 = dom.createTextNode("\n                    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","");
          var el3 = dom.createTextNode("\n                        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("i");
          dom.setAttribute(el3,"class","icon icon-property-dashboard-active");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          dom.setAttribute(el3,"class","icon-label");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 3]),0,0);
          return morphs;
        },
        statements: [
          ["content","item.title",["loc",[null,[15,49],[15,63]]]]
        ],
        locals: ["item"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 43,
            "column": 0
          }
        },
        "moduleName": "ember-app/templates/snippets/workspace-control.handlebars"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","sidebar-container property-switcher fixed-top allow-if-delinquent");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"href","/");
        var el3 = dom.createElement("i");
        dom.setAttribute(el3,"class","icon icon-logo dashboard-logo");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        dom.setAttribute(el3,"class","dashboard-logo-text");
        var el4 = dom.createTextNode("Dashboard");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","navigator-toggle icon icon-navigator-toggle");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"id","property-navigator");
        dom.setAttribute(el2,"class","dropdown-menu");
        var el3 = dom.createTextNode("\n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","active");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5,"href","");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("i");
        dom.setAttribute(el6,"class","icon icon-property-dashboard-active");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"class","icon-label");
        var el7 = dom.createTextNode("Workspace 1");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5,"href","");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("i");
        dom.setAttribute(el6,"class","icon icon-property-databases");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"class","icon-label");
        var el7 = dom.createTextNode("Workspace 2");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5,"href","/OlaMagic/dashboard/togrul/workspaces/settings");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("i");
        dom.setAttribute(el6,"class","icon icon-property-support");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"class","icon-label");
        var el7 = dom.createTextNode("Settings");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [3]);
        var morphs = new Array(2);
        morphs[0] = dom.createElementMorph(element1);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [5, 1]),1,1);
        return morphs;
      },
      statements: [
        ["element","action",["showMissionControl"],[],["loc",[null,[6,61],[6,92]]]],
        ["block","each",[["get","model",["loc",[null,[11,20],[11,25]]]]],[],0,null,["loc",[null,[11,12],[18,21]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('ember-app/tests/adapters/application.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/application.js should pass jshint', function() { 
    ok(false, 'adapters/application.js should pass jshint.\nadapters/application.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nadapters/application.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('ember-app/tests/adapters/workspace.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/workspace.js should pass jshint', function() { 
    ok(false, 'adapters/workspace.js should pass jshint.\nadapters/workspace.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nadapters/workspace.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('ember-app/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(false, 'app.js should pass jshint.\napp.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\napp.js: line 2, col 1, \'import\' is only available in ES6 (use esnext option).\napp.js: line 3, col 1, \'import\' is only available in ES6 (use esnext option).\napp.js: line 4, col 1, \'import\' is only available in ES6 (use esnext option).\napp.js: line 18, col 1, \'export\' is only available in ES6 (use esnext option).\n\n5 errors'); 
  });

});
define('ember-app/tests/controllers/admin-numbers.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/admin-numbers.js should pass jshint', function() { 
    ok(false, 'controllers/admin-numbers.js should pass jshint.\ncontrollers/admin-numbers.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\ncontrollers/admin-numbers.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('ember-app/tests/controllers/dashboard.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/dashboard.js should pass jshint', function() { 
    ok(false, 'controllers/dashboard.js should pass jshint.\ncontrollers/dashboard.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\ncontrollers/dashboard.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\ncontrollers/dashboard.js: line 9, col 63, Use \'===\' to compare with \'\'.\n\n3 errors'); 
  });

});
define('ember-app/tests/helpers/resolver', ['exports', 'ember/resolver', 'ember-app/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('ember-app/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('ember-app/tests/helpers/start-app', ['exports', 'ember', 'ember-app/app', 'ember-app/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('ember-app/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('ember-app/tests/models/ad-source.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/ad-source.js should pass jshint', function() { 
    ok(false, 'models/ad-source.js should pass jshint.\nmodels/ad-source.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nmodels/ad-source.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('ember-app/tests/models/call.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/call.js should pass jshint', function() { 
    ok(false, 'models/call.js should pass jshint.\nmodels/call.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nmodels/call.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('ember-app/tests/models/campaign.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/campaign.js should pass jshint', function() { 
    ok(false, 'models/campaign.js should pass jshint.\nmodels/campaign.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nmodels/campaign.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('ember-app/tests/models/number.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/number.js should pass jshint', function() { 
    ok(false, 'models/number.js should pass jshint.\nmodels/number.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nmodels/number.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('ember-app/tests/models/site.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/site.js should pass jshint', function() { 
    ok(false, 'models/site.js should pass jshint.\nmodels/site.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nmodels/site.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('ember-app/tests/models/user.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/user.js should pass jshint', function() { 
    ok(false, 'models/user.js should pass jshint.\nmodels/user.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nmodels/user.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('ember-app/tests/models/workspace.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/workspace.js should pass jshint', function() { 
    ok(false, 'models/workspace.js should pass jshint.\nmodels/workspace.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nmodels/workspace.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('ember-app/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(false, 'router.js should pass jshint.\nrouter.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nrouter.js: line 2, col 1, \'import\' is only available in ES6 (use esnext option).\nrouter.js: line 37, col 1, \'export\' is only available in ES6 (use esnext option).\n\n3 errors'); 
  });

});
define('ember-app/tests/routes/admin-numbers.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/admin-numbers.js should pass jshint', function() { 
    ok(false, 'routes/admin-numbers.js should pass jshint.\nroutes/admin-numbers.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/admin-numbers.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('ember-app/tests/routes/admin-users.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/admin-users.js should pass jshint', function() { 
    ok(false, 'routes/admin-users.js should pass jshint.\nroutes/admin-users.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/admin-users.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('ember-app/tests/routes/dashboard-pbx-numbers.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/dashboard-pbx-numbers.js should pass jshint', function() { 
    ok(false, 'routes/dashboard-pbx-numbers.js should pass jshint.\nroutes/dashboard-pbx-numbers.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/dashboard-pbx-numbers.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('ember-app/tests/routes/dashboard.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/dashboard.js should pass jshint', function() { 
    ok(false, 'routes/dashboard.js should pass jshint.\nroutes/dashboard.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/dashboard.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('ember-app/tests/routes/dashboard/pbx/numbers.jshint', function () {

  'use strict';

  module('JSHint - routes/dashboard/pbx');
  test('routes/dashboard/pbx/numbers.js should pass jshint', function() { 
    ok(false, 'routes/dashboard/pbx/numbers.js should pass jshint.\nroutes/dashboard/pbx/numbers.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/dashboard/pbx/numbers.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('ember-app/tests/test-helper', ['ember-app/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('ember-app/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('ember-app/tests/unit/controllers/admin-numbers-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:admin-numbers', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('ember-app/tests/unit/controllers/admin-numbers-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/admin-numbers-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/admin-numbers-test.js should pass jshint.'); 
  });

});
define('ember-app/tests/unit/controllers/dashboard-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:dashboard', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('ember-app/tests/unit/controllers/dashboard-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/dashboard-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/dashboard-test.js should pass jshint.'); 
  });

});
define('ember-app/tests/unit/models/ad-source-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('ad-source', 'Unit | Model | ad source', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('ember-app/tests/unit/models/ad-source-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/ad-source-test.js should pass jshint', function() { 
    ok(true, 'unit/models/ad-source-test.js should pass jshint.'); 
  });

});
define('ember-app/tests/unit/models/call-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('call', 'Unit | Model | call', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('ember-app/tests/unit/models/call-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/call-test.js should pass jshint', function() { 
    ok(true, 'unit/models/call-test.js should pass jshint.'); 
  });

});
define('ember-app/tests/unit/models/campaign-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('campaign', 'Unit | Model | campaign', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('ember-app/tests/unit/models/campaign-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/campaign-test.js should pass jshint', function() { 
    ok(true, 'unit/models/campaign-test.js should pass jshint.'); 
  });

});
define('ember-app/tests/unit/models/number-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('number', 'Unit | Model | number', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('ember-app/tests/unit/models/number-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/number-test.js should pass jshint', function() { 
    ok(true, 'unit/models/number-test.js should pass jshint.'); 
  });

});
define('ember-app/tests/unit/models/site-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('site', 'Unit | Model | site', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('ember-app/tests/unit/models/site-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/site-test.js should pass jshint', function() { 
    ok(true, 'unit/models/site-test.js should pass jshint.'); 
  });

});
define('ember-app/tests/unit/models/user-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('user', 'Unit | Model | user', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('ember-app/tests/unit/models/user-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/user-test.js should pass jshint', function() { 
    ok(true, 'unit/models/user-test.js should pass jshint.'); 
  });

});
define('ember-app/tests/unit/models/workspace-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('workspace', 'Unit | Model | workspace', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('ember-app/tests/unit/models/workspace-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/workspace-test.js should pass jshint', function() { 
    ok(true, 'unit/models/workspace-test.js should pass jshint.'); 
  });

});
define('ember-app/tests/unit/routes/admin-numbers-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:admin-numbers', 'Unit | Route | admin numbers', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('ember-app/tests/unit/routes/admin-numbers-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/admin-numbers-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/admin-numbers-test.js should pass jshint.'); 
  });

});
define('ember-app/tests/unit/routes/admin-users-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:admin-users', 'Unit | Route | admin users', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('ember-app/tests/unit/routes/admin-users-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/admin-users-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/admin-users-test.js should pass jshint.'); 
  });

});
define('ember-app/tests/unit/routes/dashboard-pbx-numbers-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:dashboard-pbx-numbers', 'Unit | Route | dashboard pbx numbers', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('ember-app/tests/unit/routes/dashboard-pbx-numbers-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/dashboard-pbx-numbers-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/dashboard-pbx-numbers-test.js should pass jshint.'); 
  });

});
define('ember-app/tests/unit/routes/dashboard-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:dashboard', 'Unit | Route | dashboard', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('ember-app/tests/unit/routes/dashboard-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/dashboard-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/dashboard-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('ember-app/config/environment', ['ember'], function(Ember) {
  var prefix = 'ember-app';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("ember-app/tests/test-helper");
} else {
  require("ember-app/app")["default"].create({"name":"ember-app","version":"0.0.0+ecf54c44"});
}

/* jshint ignore:end */
//# sourceMappingURL=ember-app.map