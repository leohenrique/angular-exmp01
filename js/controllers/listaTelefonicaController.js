
angular.module('listaTelefonica').controller('listaTelefonicaCtrl', function($scope, contatosAPI, operadorasAPI, serialGenerator){
    console.log(serialGenerator.generate());
    $scope.app = "Lista Telefonica";
    $scope.contatos = [];
    $scope.operadoras = [];
    /*$scope.contatos = [
        {nome: $filter('uppercase')("Pedro"), telefone: "99999912", data: new Date(), 
            operadora: {nome: "Oi", codigo:14, categoria: "Celular"}, cor: "yellow"},
        {nome: "Ana", telefone: "991292912", data: new Date(), 
            operadora: {nome: "Vivo", codigo:15, categoria: "Celular"}, cor:"blue"},
        {nome: "Maria", telefone: "9998639912", data: new Date(), 
            operadora: {nome: "Tim", codigo:41, categoria: "Celular"}, cor: "red"}
    ];
    $scope.operadoras = [
        {nome: "Oi", codigo:14, categoria: "Celular", mensalidade: 10},
        {nome: "Vivo", codigo: 15, categoria: "Celular", mensalidade: 70},
        {nome: "Tim", codigo: 41, categoria: "Celular", mensalidade: 90},
        {nome: "GVT", codigo: 25, categoria: "Fixo", mensalidade: 10},
        {nome: "Embratel", codigo: 21, categoria: "Fixo", mensalidade: 20}
    ];
    */
    
    
    function carregarContatos(){
        console.log('carregar contatos');
        contatosAPI.getContatos().success( function (data){
            console.log('carregar contatos success');
            $scope.contatos = data;
        }).error(function (data, status){
            
            $scope.error = "Não foi possível carregar os dados!";
        });
    };

    function carregarOperadoras(){
        operadorasAPI.getOperadoras().success(function (data){
            $scope.operadoras = data;
        });
    };

    $scope.adicionarContato = function(contato){
        
        contato.serial = serialGenerator.generate();
        contatosAPI.saveContato(contato).success(function (data){
            console.log('contato post success');
            delete $scope.contato;
            carregarContatos();
            $scope.contatoForm.$setPristine();
            
        });
    };
    
    $scope.apagarContato = function(contatos){
        console.log('apagarContato');
        $scope.contatos = contatos.filter(function (contato) {
            if (!contato.selecionado) return contato;
        });
        
    };
    
    $scope.isContatoSelecionado = function (contatos){
        var a = contatos.some(function (contato){
                return contato.selecionado;                    
        });
        return a;
    };

    $scope.ordenarPor = function(coluna){
        $scope.criterioDeOrdenacao = coluna;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao; 
    }
    
    carregarContatos();
    carregarOperadoras();
});
