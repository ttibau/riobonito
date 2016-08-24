angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $location, $ionicPopup) {


  $scope.refresh = function(){
    $ionicPopup.alert({
      title: 'Estamos quase lá!',
      template: 'Aguarde até o dia das apurações ;D'
    });
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.mostraMensagem = function(){
    var alerta = $ionicPopup.alert({
      title: 'Aviso',
      template: 'Atenção, a apuração estará disponível no dia 1/10/2016 <strong>primeiro turno</strong>, o resultado será feito em tempo real'
    });
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

.controller('PlaylistsCtrl', function($scope) {

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

