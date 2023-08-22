import bancodedados from "../bancodedados.js";
import { validarContasIguais, validarNumeroConta, validarSaldoInsuficiente, validarSenhaConta, validarValor} from "../utils/transacoesUtils.js";

export const validarDeposito = (req, res, next) => {
    const { numero_conta, valor} = req.body;
    const validacoes = [() => validarNumeroConta(numero_conta), () => validarValor(valor)];

    for (let validacao of validacoes){
        const erro = validacao();
        if (erro) return res.status(erro.status).json({"message": erro.message});
    }

    next();
}

export const validarSaque = (req, res, next) => {
    const { senha, numero_conta, valor } = req.body;

    const conta = bancodedados.contas.find(conta => conta.numero == numero_conta);

    const validacoes = [() => validarNumeroConta(numero_conta), () => validarValor(valor), () => validarSenhaConta(conta, senha), () => validarSaldoInsuficiente(conta, valor)];

    for (let validacao of validacoes){
        const erro = validacao();
        if (erro) return res.status(erro.status).json({"message": erro.message});
    }

    next();

}

export const validarTransferencia = (req, res, next) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
    const contaOrigem = bancodedados.contas.find(conta => conta.numero === numero_conta_origem);
    const validacoes = [() => validarContasIguais(numero_conta_origem, numero_conta_destino), () => validarNumeroConta(numero_conta_origem, " de origem "), () => validarNumeroConta(numero_conta_destino, " de destino "), () => validarSenhaConta(contaOrigem, senha), () => validarValor(valor), () => validarSaldoInsuficiente(contaOrigem, valor)];

    for (let validacao of validacoes){
        const erro = validacao();
        if (erro) return res.status(erro.status).json({"message": erro.message});
    }

    next();

};

export const validarSaldoExtrato = (req, res, next) => {
    const { senha, numero_conta } = req.query;
    const conta = bancodedados.contas.find(conta => conta.numero == numero_conta);
    const validacoes = [() => validarNumeroConta(numero_conta), () => validarSenhaConta(conta, senha)];

    for (let validacao of validacoes){
        const erro = validacao();
        if (erro) return res.status(erro.status).json({"message": erro.message});
    }

    next();
};