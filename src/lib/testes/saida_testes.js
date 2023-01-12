const reporta_seja = (esperado, obtido) => {
    let menssagem =
        "\tesperado_que(obtido).seja(esperado) //Object.is igualdade";
    menssagem += `\n\tEsperado: ${esperado}\n\tObtido: ${obtido}`;
    return menssagem;
};

const reporta_seja_verdadeiro = (obtido) => {
    let menssagem = "\tesperado_que(obtido).seja_verdadeiro()\n";
    menssagem += `\tEsperado: verdadeiro\n\tObtido: ${
        !obtido ? "falso" : obtido
    }`;
    return menssagem;
};
const reporta_seja_falso = (obtido) => {
    let menssagem = "\tesperado_que(obtido).seja_falso()\n";
    menssagem += `\tEsperado: verdadeiro\n\tObtido: ${
        !obtido ? "falso" : obtido
    }`;
    return menssagem;
};

const reporta_nao_nulo = (esperado, obtido) => {
    let menssagem = "\tesperado_que(obtido).nao_nulo()\n";
    menssagem += `\tEsperado: valor\nObtido: nulo`;
    return menssagem;
};

const reporta_seja_objeto = (esperado, obtido) => {
    let menssagem = "\tesperado_que(obtido).seja_objeto(esperado)";
    menssagem += `\n\tEsperado: ${esperado}\n\tObtido: ${obtido}`;
    return menssagem;
};

const novo_resultado = (
    passou,
    nome_teste,
    nome_conjunto,
    onde,
    obtido,
    esperado
) => {
    let resultado = `  ${passou ? "✔" : "✖"}  ${nome_teste}`;

    if (passou) {
        return resultado;
    }

    resultado += `\n\t ● ${nome_conjunto} > ${nome_teste}  \n`;

    switch (onde) {
        case "seja":
            resultado += reporta_seja(esperado, obtido);
            break;
        case "seja_verdadeiro":
            resultado += reporta_seja_verdadeiro(obtido);
            break;
        case "seja_falso":
            resultado += reporta_seja_falso(obtido);
            break;
        case "nao_nulo":
            resultado += reporta_nao_nulo(obtido);
            break;
        case "seja_proximo":
            resultado += reporta_nao_nulo(obtido);
            break;
        case "seja_objeto":
            resultado += reporta_seja_objeto(obtido, esperado);
            break;
    }
    return resultado;
};

module.exports.novo_resultado = novo_resultado;
