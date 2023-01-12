const StandardFn = require("../../structures/standardFn");
const compara_obj = (o1, o2) => {
    return JSON.stringify(o1) === JSON.stringify(o2);
};

const correspondencias = (obtido, conjuto_testes) => {
    conjunto_atual = conjuto_testes;
    return {
        seja: new StandardFn(1, (esperado) => {
            if (Object.is(obtido, esperado)) {
                conjuto_testes.teste_passou();
                return;
            }
            conjuto_testes.teste_falhou("seja", obtido, esperado);
        }),
        nao_seja: new StandardFn(1, (esperado) => {
            if (!Object.is(obtido, esperado)) {
                conjuto_testes.teste_passou();
                return;
            }
            conjuto_testes.teste_falhou("nao_seja", obtido, esperado);
        }),
        seja_verdadeiro: new StandardFn(1, () => {
            if (obtido) {
                conjuto_testes.teste_passou();
                return;
            }
            conjuto_testes.teste_falhou("seja_verdadeiro", obtido);
        }),
        seja_falso: new StandardFn(1, () => {
            if (!obtido) {
                conjuto_testes.teste_passou();
                return;
            }
            conjuto_testes.teste_falhou("seja_falso", obtido);
        }),
        nao_nulo: new StandardFn(1, () => {
            if (obtido !== null) {
                conjuto_testes.teste_passou();
                return;
            }
            conjuto_testes.teste_falhou("nao_nulo", obtido);
        }),
        seja_proximo: new StandardFn(1, (esperado, precisao = 0.1) => {
            if (typeof esperado !== "number") {
                conjuto_testes.erro("`esperado` precisa ser do tipo número");
            }
            if (typeof obtido !== "number") {
                conjuto_testes.erro("`obtido` precisa ser do tipo número");
            }

            let passou;
            if (obtido === Infinity && esperado === Infinity) {
                passou = true;
            } else if (obtido === -Infinity && esperado === -Infinity) {
                passou = true;
            } else {
                let dif_esperado = Math.pow(10, -precisao) / 2;
                let dif_obtido = Math.abs(esperado - obtido);
                passou = dif_obtido < dif_esperado;
            }

            if (passou) {
                conjuto_testes.teste_passou();
                return;
            }
            conjuto_testes.teste_falhou("seja_proximo", obtido, esperado);
        }),
        seja_objeto: new StandardFn(1, (esperado) => {
            if (compara_obj(obtido, esperado)) {
                conjuto_testes.teste_passou();
                return;
            }
            conjuto_testes.teste_falhou("seja_objeto", obtido, esperado);
        }),
    };
};

module.exports.correspondencias = correspondencias;
