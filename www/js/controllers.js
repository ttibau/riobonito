angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $location, $ionicPopup, $firebaseArray, $ionicLoading, ApuracaoVotos) {

var ref = new Firebase("https://riobonito-92bac.firebaseio.com/");

$scope.pegaApuracao = function(){
  $scope.dados = $firebaseArray(ref.child('apuracao'));
  $scope.login();
  $ionicLoading.show({
      template: 'Carregando dados...'
    });
  $scope.dados.$loaded(
  function(x) {
    $ionicLoading.hide();
  }, function(error) {
    console.error("Error:", error);
  });
  ApuracaoVotos.dados = $scope.dados;
  console.log(ApuracaoVotos.dados);
  return ApuracaoVotos.dados;
};

  $scope.dados = ApuracaoVotos.dados;
  console.log($scope.dados);

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

  $scope.pegaDados = function ( data){
    $scope.dados = $firebaseArray(ref.child('telelista').child(data));
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

.controller('destaquesCtrl', function($scope, $firebaseArray, $ionicModal, $ionicLoading, ItemSelecionado, $ionicPopup){
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
       console.log("O indicador de Loading foi iniciado...");
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

.controller('culturaCtrl', function($scope, $http, $ionicModal, $ionicLoading, $firebaseArray, AgendaCultural){
  var ref = new Firebase("https://riobonito-92bac.firebaseio.com/");

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
            //console.log(data.items);
        })
        .error(function(data) {
            console.log("ERROR: " + data);
        });
  };

   $scope.browse = function(v){
    window.open(v, "_system", "location=yes");
    console.log('foi');
  };


    $scope.agenda = $firebaseArray(ref.child('cultural'));
    console.log($scope.agenda);


  // faz a instancia do modal
  $ionicModal.fromTemplateUrl('templates/agendacultural.html', {
    scope: $scope,
    animation: 'slide-in-up'
   }).then(function(modal){
    $scope.modal = modal;
   });

  $scope.agendaCultural = function(){
   $scope.modal.show();
  };

  $scope.fecharModal = function(){
    $scope.modal.hide();
  };


  $scope.mariana();

})

.controller("noticiaSelecionadaCtrl", function($scope, ListaNoticia){
  console.log(ListaNoticia.dados);
  $scope.listaNoticias = ListaNoticia.dados;
   $scope.browse = function(v){
    window.open(v, "_system", "location=yes");
    console.log('foi');
  };

})

.controller("meteorologiaCtrl", function($scope, $http, $ionicLoading, $ionicPopup){
  $ionicLoading.show({
      template: 'Carregando dados...'
    }).then(function(){
       console.log("The loading indicator is now displayed");
    });
  $http.get("http://api.hgbrasil.com/weather/?format=json&cid=BRXX3194")
    .success(function(dados){
      $scope.dados = dados;
      $scope.img = "http://assets.hgbrasil.com/weather/images/" + dados.results.img_id + ".png";
      switch (dados.results.img_id){
        case "26n":
          $scope.img = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/96/Status-weather-many-clouds-icon.png";
          break;
        case "31n":
          $scope.img = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-few-clouds-night-icon.png";
          break;
        case "29n":
          $scope.img = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-clouds-night-icon.png";
      	  break;
      	case "30":
      	  $scope.img = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/96/Status-weather-clouds-icon.png";
      	  break;
      	case "34":
      	  $scope.img = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/96/Status-weather-clouds-icon.png";
      	  break;
      	case "27n":
      	  $scope.img = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-few-clouds-night-icon.png";
          break;
        case "26":
          $scope.img = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-many-clouds-icon.png";
          break;
        case "32"  :
          $scope.img = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-clear-icon.png";
      	default:
          console.log("nenhuma");
      }
        if (dados.results.temp == "") {
          console.log("0");
          $ionicPopup.alert({
            title: 'Atenção!',
            template: 'O sistema está consultando os dados e será incluso em instantes, por favor, retorne em alguns minutos.'
          });
        };
      $ionicLoading.hide();
      console.log(dados);
    })
    .error(function(err){
      console.log("ERRO " + err);
    });

})

.controller("apuracaoCtrl", function($scope){

})

.controller("sobreCtrl", function($scope, $firebaseObject){
  var ref = new Firebase("https://riobonito-92bac.firebaseio.com");
  $scope.mensagem = $firebaseObject(ref.child('mensagem'));
  console.log($scope.mensagem);
})

.controller("turismoCtrl", function($scope, $firebaseObject, $ionicLoading){
  var ref = new Firebase("https://riobonito-92bac.firebaseio.com/");
  $scope.turismo = $firebaseObject(ref.child('turismo'));
  $ionicLoading.show({
  	template: 'Carregando dados...'
  });
  $scope.turismo.$loaded(
  	function(x){
		$ionicLoading.hide();
	}, function(error){
		console.log(error);
	});
})

.controller("estabelecimentosCtrl", function($scope, $http, $ionicLoading, $location, EstabelecimentoSelecionado){
  $ionicLoading.show({
    template: 'Carregando dados...'
  }).then(function(){
    console.log("O indicador de carregamento foi iniciado");
  });
  $http.get("http://mobile-aceite.tcu.gov.br/mapa-da-saude/rest/estabelecimentos?municipio=Rio%20Bonito&uf=RJ&quantidade=300")
    .success(function(data){
      $scope.dados = data;
      //console.log($scope.dados);
      $ionicLoading.hide();
    })
    .error(function(err){
      console.log("Erro: " + err);
    });

    $scope.selecionaEstabelecimento = function(codUnidade){
      EstabelecimentoSelecionado.estabelecimento = codUnidade;
      //console.log(EstabelecimentoSelecionado.estabelecimento);
      $location.path('/estabelecimentoselecionado');
    };

    $scope.fechar = function(){
      $location.path('/app/estabelecimentos');
    };

})

.controller("estabelecimentoSelecionadoCtrl", function($scope, $http, EstabelecimentoSelecionado){
  $http.get("http://mobile-aceite.tcu.gov.br:80/mapa-da-saude/rest/estabelecimentos/unidade/" + EstabelecimentoSelecionado.estabelecimento)
    .success(function(data){
      $scope.dados = data;
      console.log($scope.dados);
    })
    .error(function(err){
      console.log("Erro: " + err);
    });
})
