import bancodedados from "../bancodedados.js";

export const validarNumeroConta = (numeroConta) => {
    if (!numeroConta) return { status: 400, message: "O número da conta é obrigatório"};
    if (!bancodedados.contas.some(conta => conta.numero === numeroConta)) {
        return {status: 404, message: "Não existe uma conta com esse número."};
    }
    return null;
};

export const validarSaldoInsuficiente = (contaOrigem, valor) => {
    if (valor > contaOrigem.saldo ) return {status: 400, message: "Saldo insuficiente"};
};

export const validarSenhaConta = (conta, senha) => {
    if (!senha) return { status: 400, message: "A senha é obrigatória."};
    if (conta.senha != senha) return {status: 401, message: "Senha incorreta."};
};

export const validarValor = (valor) => {
    if (!valor) return { status: 400, message: "O valor do depósito é obrigatório." };

    if (valor <= 0) return { status: 400, message: "O valor deve ser maior que zero." };
};