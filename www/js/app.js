// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'firebase', 'angular-toArrayFilter'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.factory('Agendacultural', function(){
  
})

.factory('ListaNoticia', function(){
  dados = [];
  dados.rssTitle = [];
  dados.rssUrl = [];
  dados.rssSiteUrl = [];
  dados.entries = [];
  return dados;
})

.factory('ApuracaoVotos', function(){
  dados = [];
  dados.vereador = [];
  dados.prefeito = [];
  return dados;
})

.factory('ListaSelecionado', function(){
  dados = {};
  dados.nome = '';
  dados.endereco = '';
  dados.telefone = '';
  return dados;
})

.factory('ItemSelecionado', function(){
  item = {};
  item.nome = '';
  item.endereco = '';
  item.telefone = '';
  return item;
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.noticiaselecionada', {
      url: '/noticiaselecionada',
      views: {
        'menuContent': {
          templateUrl: 'templates/noticiaselecionada.html',
          controller: 'noticiaSelecionadaCtrl'
        }
      }
    }) 

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.apuracao', {
    url: '/apuracao',
    views: {
      'menuContent' : {
        templateUrl: 'templates/login.html',
        controller: 'apuracaoCtrl'
      }
    }
  })

  .state('app.meteorologia', {
    url: '/meteorologia',
    views: {
      'menuContent' : {
        templateUrl: 'templates/meteorologia.html',
        controller: 'meteorologiaCtrl'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
          controller: 'listaCtrl'
        }
      }
    })
    .state('app.noticias', {
      url: '/noticias',
      views: {
        'menuContent': {
          templateUrl: 'templates/noticias.html',
          controller: 'noticiasCtrl'
        }
      }
    })

    .state('app.cultura', {
      url: '/cultura',
      views: {
        'menuContent': {
          templateUrl: 'templates/cultura.html',
          controller: 'culturaCtrl'
        }
      }
    })

    .state('app.destaques', {
      url: '/destaques',
      views: {
        'menuContent': {
          templateUrl: 'templates/destaques.html',
          controller: 'destaquesCtrl'
        }
      }
    })

    .state('selecionado', {
      url: '/selecionado',
      templateUrl: 'templates/selecionado.html',
      controller: 'itemSelecionadoCtrl'
    })

    .state('app.lista', {
      url: '/lista',
      views: {
        'menuContent': {
          templateUrl: 'templates/lista.html',
          controller: 'listaCtrl'
        }
      }
    })

    .state('app.listatodos', {
      url: '/listatodos',
      views: {
        'menuContent': {
          templateUrl: 'templates/listatodos.html',
          controller: 'ListaTodosCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/destaques');
});
