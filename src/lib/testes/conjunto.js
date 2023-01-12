const { novo_erro } = require("./erro");
const { novo_resultado } = require("./saida_testes");

const color = (color) => {
    switch (color) {
        case "red":
            return "\x1b[31m";
        case "green":
            return "\x1b[32m";
    }
};

const novo_conjunto = (descricao) => {
    return {
        descricao: descricao,
        total_passou: 0,
        total_falhou: 0,
        teste_atual: "",
        resultados: [],
        token_atual: null,

        erro(menssagem) {
            novo_erro(this.token_atual, menssagem);
        },

        teste_passou() {
            this.total_passou += 1;
            this.resultados.push(novo_resultado(true, this.teste_atual));
        },

        teste_falhou(onde, obtido, esperado) {
            this.total_falhou += 1;
            this.resultados.push(
                novo_resultado(
                    false,
                    this.teste_atual,
                    this.descricao,
                    onde,
                    obtido,
                    esperado
                )
            );
        },

        resumo() {
            const falhou = this.total_falhou > 0;
            let menssagem = `${falhou ? color("red") : color("green")}\x1b[1m${
                this.descricao
            } -- ${falhou ? "FALHOU" : "PASSOU"}\x1b[0m\n`;
            for (let res of this.resultados) {
                menssagem += `${res}\n`;
            }
            menssagem += `Testes: ${this.total_passou} passou, ${this.total_falhou} falhou, ${this.resultados.length} total`;
            return menssagem;
        },
    };
};

module.exports.novo_conjunto = novo_conjunto;
