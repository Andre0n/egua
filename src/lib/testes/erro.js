const { RuntimeError } = require("../../errors");

const novo_erro = (token, mensagem) => {
    throw new RuntimeError(token, mensagem);
};

module.exports.novo_erro = novo_erro;
