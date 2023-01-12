const StandardFn = require("../../structures/standardFn");
const { novo_conjunto } = require("./conjunto");
const { correspondencias } = require("./correspondencias");
const { novo_erro } = require("./erro");

let conjunto_atual = null;

const esperado_que = (obtido) => {
    return correspondencias(obtido, conjunto_atual);
};

module.exports.novo_conjunto = function (descricao = "") {
    if (typeof descricao !== "string") {
        novo_erro(this.token, "A descrição do conjunto deve ser um texto");
    }
    if (descricao === "") {
        novo_erro(this.token, "A descrição do conjunto não pode ser vazia");
    }
    conjunto_atual = novo_conjunto(descricao, this.token);
};

module.exports.novo_teste = function (descricao = "") {
    if (typeof descricao !== "string") {
        novo_erro(this.token, "A descrição  do teste deve ser um texto");
    }
    if (descricao === "") {
        novo_erro(this.token, "A descrição  do teste não pode ser vazia");
    }
    conjunto_atual.teste_atual = descricao;
    conjunto_atual.token = this.token;
    return {
        esperado_que: new StandardFn(0, esperado_que),
    };
};

module.exports.resultados = function () {
    if (conjunto_atual == null) {
        novo_erro(this.token, "O conjunto de testes não foi descrito");
    }
    const resumo = conjunto_atual.resumo();
    conjunto_atual = null;
    return resumo;
};
