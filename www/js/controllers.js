angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $location, $ionicPopup) {


  $scope.refresh = function(){
    $ionicPopup.alert({
      title: 'Estamos quase lá!',
      template: 'Aguarde até o dia das apurações :D'
    });
    $scope.$broadcast('scroll.refreshComplete');
  };


  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.voltar = function(){
    $scope.closeLogin();  
  };

})

.controller('VereadorCtrl', function($scope){

})
 
.controller('noticiasCtrl', function($scope, $http, ListaNoticia, $ionicLoading, $location) {

  $scope.parceiros = {
    nadelson: {
      logo: 'img/nadelson.png',
      site: 'www.nadelson.com.br',
      nome: 'Nadelson',
      url: 'http://nadelson.com.br/feed/',
      descricao: 'Café Poético e Filosófico'
    },
    flavioAzevezo: {
      logo: 'img/flavioazevedo.jpg',
      site: 'www.jornalistaflavioazevedo.blogspot.com.br/',
      nome: 'Jornalista Flávio Azevedo',
      url: 'http://jornalistaflavioazevedo.blogspot.com/feeds/posts/default?alt=rss',
      descricao: 'É editor do jornal "O TEMPO", um dos jornais que circulam em Rio Bonito/RJ. Ele também apresenta, na Super Radio Tupi 1340 AM - Leste Fluminense, de segunda a sexta-feira, entre 13h e 15h, o "Programa Flávio Azevedo", do qual é produtor e diretor'
    }, 
    riobonito: {
      logo: 'img/rbrj.png',
      site: 'www.riobonito.blogspot.com.br/',
      nome: 'Portal Rio Bonito - RJ',
      url: 'http://riobonito.blogspot.com/feeds/posts/default?alt=rss',
      descricao: 'SEJA BEM VINDO AO PORTAL DE NOTÍCIAS DA CIDADE DE RIO BONITO! VAMOS SONHAR COM DIAS MELHORES, COM UMA CIDADE MELHOR PARA TODOS!'
    }
  };

  $scope.pegaParceiro = function(url){
    $ionicLoading.show({
        template: 'Carregando dados...'
      }).then(function(){
         console.log("O indicador de carregamento foi iniciado...");
    });  
    $http.get("http://rss2json.com/api.json", { params: { "rss_url" : url } })
      .success(function(data){
        ListaNoticia.dados = data;
        $scope.dados = data;
        $ionicLoading.hide();  
        $location.path('/app/noticiaselecionada');      
       // console.log($scope.dados);
      })
      .error(function(err){
        console.log("ERRO: " + err);
      });
  };


  
})

.controller('PlaylistCtrl', function($scope) {
  
})

.controller('listaCtrl', function($scope, $firebaseArray, $ionicPopup, $location, ListaSelecionado, $ionicLoading){
  var ref = new Firebase("https://riobonito-92bac.firebaseio.com/");

  $scope.pegaDados = function (data){
    $scope.dados = $firebaseArray(ref.child(data));
    $location.path('/app/lista');
    $ionicLoading.show({
      template: 'Carregando dados...'
    }).then(function(){
       console.log("The loading indicator is now displayed");
    });
    $scope.dados.$loaded(
  function(x) {
    $ionicLoading.hide();
  }, function(error) {
    console.error("Error:", error);
  });
    ListaSelecionado.dados = $scope.dados;
    //console.log(ListaSelecionado.dados);
  };

})

.controller('listaItemCtrl', function($scope, $firebaseObject, $ionicPopup, ListaSelecionado, $ionicModal, ItemSelecionado){
  //console.log(ListaSelecionado.dados);
  $scope.dados = ListaSelecionado.dados;
  // Crio a intancia e injeto no scopo $scope.modal
   $ionicModal.fromTemplateUrl('templates/selecionado.html', {
    scope: $scope,
    animation: 'slide-in-up'
   }).then(function(modal){
    $scope.modal = modal;
   });
   //abre a modal
   $scope.abrirModal = function(dados){
      $scope.modal.show();
      ItemSelecionado.item = dados; 
      $scope.item = ItemSelecionado.item;
      console.log(ItemSelecionado.item);
   };

   //fecha a modal
   $scope.fecharModal = function(){
      $scope.modal.hide();
   };
})

.controller('destaquesCtrl', function($scope, $firebaseArray, $ionicModal, $ionicLoading, ItemSelecionado){
  var ref = new Firebase("https://riobonito-92bac.firebaseio.com/");
  $scope.pegaDados = function(){
    $scope.dados = $firebaseArray(ref.child('destaque'));
    ItemSelecionado.item = $scope.dados;
    console.log($scope.dados);
  };

  $scope.pegaDados();
  $ionicLoading.show({
      template: 'Carregando dados...'
    }).then(function(){
       console.log("The loading indicator is now displayed");
    });
    $scope.dados.$loaded(
  function(x) {
    $ionicLoading.hide();
  }, function(error) {
    console.error("Error:", error);
  });

  $ionicModal.fromTemplateUrl('templates/destaqueselecionado.html', {
    scope: $scope,
    animation: 'slide-in-up'
   }).then(function(modal){
    $scope.modal = modal;
   });  

   //abre a modal
   $scope.abrirModal = function(dados){
      $scope.modal.show();
      ItemSelecionado.item = dados; 
      $scope.item = ItemSelecionado.item;
      console.log(ItemSelecionado.item);
   };

   //fecha a modal
   $scope.fecharModal = function(){
      $scope.modal.hide();
   };

})

.controller('culturaCtrl', function($scope, $http, $ionicPopup, $ionicLoading){

  $scope.mariana = function() {
    $ionicLoading.show({
      template: 'Carregando dados...'
    }).then(function(){
       console.log("The loading indicator is now displayed");
    });
    $http.get("http://rss2json.com/api.json", { params: { "rss_url": "https://marealvares.wordpress.com/feed/"  } } )
        .success(function(data) {
            $scope.dados = data;
            $ionicLoading.hide();
            console.log(data.items);
        })
        .error(function(data) {
            console.log("ERROR: " + data);
        });
  };

   $scope.browse = function(v){
    window.open(v, "_self", "location=yes");
    console.log('foi');
  };

  $scope.agendaCultural = function(){
    $ionicPopup.alert({
      title: 'Agenda cultural - Rio Bonito!',
      template: 'Colocar <strong>aqui</strong> a agenda cultural! Vindo do firebase'
    });
  };

  $scope.mariana();

})

.controller("noticiaSelecionadaCtrl", function($scope, ListaNoticia){
  console.log(ListaNoticia.dados);
  $scope.listaNoticias = ListaNoticia.dados;
   $scope.browse = function(v){
    window.open(v, "_self", "location=yes");
    console.log('foi');
  };

})

.controller("meteorologiaCtrl", function($scope, $http, $ionicLoading){
  $ionicLoading.show({
      template: 'Carregando dados...'
    }).then(function(){
       console.log("The loading indicator is now displayed");
    });
  $http.get("http://api.hgbrasil.com/weather/?format=json&cid=BRXX3194")
    .success(function(dados){
      $scope.dados = dados;
      $scope.img = "http://assets.hgbrasil.com/weather/images/" + dados.results.img_id + ".png";
      $ionicLoading.hide();
      console.log(dados);
    })
    .error(function(err){
      console.log("ERRO " + err);
    });


})