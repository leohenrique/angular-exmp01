var pedro = {
    nome: 'Pedro',
    idade: 90
};
console.log(pedro);

/// Factory function
var criarPessoa = function (nome, idade){
    return {
        nome: nome,
        idade: idade
    };
};

/// constructor function

var Pessoa = function (nome, idade){
    this.nome = nome;
    this.idade = idade;
};

var carlos = new Pessoa("Carlos", 19);
console.log(carlos);

carlos = {};
Pessoa.call(carlos, "Carlos", 19);
console.log(carlos);