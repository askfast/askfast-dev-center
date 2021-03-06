if (window.location.port == '8080')
{
  document.getElementsByTagName('html')[0].setAttribute('ng-app');
}

require.config (
  {
    paths: {
      config: 'configAskFast',
      jquery:   '../vendors/jquery/jquery.min',
      'jquery.browser':   '../vendors/jquery.browser/dist/jquery.browser.min',
      domReady: '../vendors/requirejs-domready/domReady',
      datatables: '../scripts/libs/datatables/1.10.4/media/js/jquery.dataTables',
      angular:  '../vendors/angular/angular',
      bootstrap:          '../vendors/bootstrap-sass/assets/javascripts/bootstrap.min',
      'angular-strap': '../vendors/angular-strap/dist/angular-strap.min',
      'angular-strap-tpl': '../vendors/angular-strap/dist/angular-strap.tpl.min',
      'angular-resource': '../vendors/angular-resource/angular-resource.min',
      'angular-route':    '../vendors/angular-route/angular-route.min',
      lawnchair:  '../vendors/lawnchair/src/Lawnchair',
      dom:        '../vendors/lawnchair/src/adapters/dom',
      moment:     '../vendors/momentjs/min/moment.min',
      'angular-datatables':'../vendors/angular-datatables/dist/angular-datatables',
      'datatables.tools':'../scripts/libs/datatables/1.10.4/extensions/TableTools/js/dataTables.tableTools.min'
      },
    shim: {
      angular:            { deps: ['jquery','datatables'], exports:  'angular' },
      'jquery.browser' :  {deps:['jquery'],exports: 'jquery.browser'},
      datatables :        {deps:['jquery'],exports: 'jquery.datatables'},
      'angular-resource': { deps: ['angular'] },
      'angular-route':    { deps: ['angular'] },
      bootstrap:          { deps: ['jquery'], exports:  'bootstrap' },
      'angular-strap':    { deps: ['angular'] },
      'angular-strap-tpl':{ deps: ['angular', 'angular-strap'] },
      lawnchair:          { exports: 'lawnchair' },
      dom:                { deps: ['lawnchair'], exports: 'dom' },
      moment:             { exports: 'moment' },
      'angular-datatables':{deps:['angular'],exports:'angular'},
      'datatables.tools':{exports:'datatables.tools'}
    }
  }
);

require (
  [
    'angular',
    'domReady',
    'jquery',
    'jquery.browser',
    'angular-resource',
    'angular-route',
    'datatables',
    'angular-datatables',
    'datatables.tools',

    'angular-strap',
    'angular-strap-tpl',

    'localization',
    'config',
    'app',
    'routes',
    'run',

    'modals/askfast',

    'directives/navbar',
    'directives/profile',
    'directives/labelResponseCode',

    'filters/all',

    'services/session',
    'services/md5',
    'services/store',
    'services/moment',
    'services/offline',
    'services/interceptor',
    'services/logger',

    'controllers/core',
    'controllers/user',
	  'controllers/profile',
	  'controllers/dashboard',
	  'controllers/credits',
    'controllers/uselogs',

    'logs/logsController',
    'logs/logsService',

    'bootstrap',
    'lawnchair',
    'dom',
    'moment'
    ],
  function (angular, domReady)
  {
    'use strict';

    domReady(function ()
      {
        angular.bootstrap(document, ['DevCen']);
      }
    );
  }
);
