import bancodedados from "../bancodedados.js";

export const validarNumeroConta = (numeroConta, tipoDeConta = " ") => {
    if (!numeroConta) {
        return { status: 400, message: `O número da conta${tipoDeConta}é obrigatório`};
    }
    if (!bancodedados.contas.find(conta => conta.numero === numeroConta)) {
        return { status: 404, message: `Não existe uma conta${tipoDeConta}com esse número.` };
    }
};

export const validarSaldoInsuficiente = (conta, valor) => {
    if (valor > conta.saldo ) return {status: 400, message: "Saldo insuficiente"};
};

export const validarSenhaConta = (conta, senha) => {
    if (!senha) return { status: 400, message: "A senha é obrigatória."};
    if (conta.usuario.senha != senha) return {status: 401, message: "Senha incorreta."};
};

export const validarValor = (valor) => {
    if (!valor) return { status: 400, message: "O valor é obrigatório." };

    if (valor <= 0) return { status: 400, message: "O valor deve ser maior que zero." };
};

export const validarContasIguais = (contaOrigem, contaDestino) => {
    if (contaOrigem === contaDestino) return { status: 400, message: "As contas de origem e destino não podem ser iguais" };
}