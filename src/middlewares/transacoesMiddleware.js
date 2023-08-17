import bancodedados from "../bancodedados.js";
import { validarNumeroConta, validarSaldoInsuficiente, validarSenhaConta, validarValor} from "../utils/transacoesUtils.js";

export const validarDeposito = (req, res, next) => {
    const { numero_conta, valor} = req.body;

    const erroNumero = validarNumeroConta(numero_conta);
    if(erroNumero) return res.status(erroNumero.status).json({"message": erroNumero.message});

    const erroValor = validarValor(valor);
    if (erroValor) return res.status(erroValor.status).json({"message": erroValor.message});

    next();
}

export const validarSaque = (req, res, next) => {
    const { senha, numero_conta, valor } = req.body;
    const conta = bancodedados.contas.find(conta => conta.numero == numero_conta);

    const erroNumero = validarNumeroConta(numero_conta);
    if(erroNumero) return res.status(erroNumero.status).json({"message": erroNumero.message});

    const erroSenha = validarSenhaConta(conta, senha);
    if (erroSenha) return res.status(erroSenha.status).json({"message": erroSenha.message});

    const erroValor = validarValor(valor);
    if (erroValor) return res.status(erroValor.status).json({"message": erroValor.message});

    next();
}

export const validarTransferencia = (req, res, next) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
    const contaOrigem = bancodedados.contas.find(conta => conta.numero === numero_conta_origem);

    const erroContaOrigem = validarNumeroConta(numero_conta_origem);
    if (erroContaOrigem) return res.status(erroContaOrigem.status).json({"message": "Erro na conta origem: " + erroContaOrigem.message});

    const erroContaDestino = validarNumeroConta(numero_conta_destino);
    if (erroContaDestino) return res.status(erroContaDestino.status).json({"message": "Erro na conta destino: " + erroContaDestino.message});

    const erroSenha = validarSenhaConta(contaOrigem, senha);
    if (erroSenha) return res.status(erroSenha.status).json({"message": erroSenha.message});
    
    const erroValor = validarValor(valor);
    if (erroValor) return res.status(erroValor.status).json({"message": erroValor.message});

    const erroSaldo = validarSaldoInsuficiente(contaOrigem, valor);
    if (erroSaldo) return res.status(erroSaldo.status).json({"message": erroSaldo.message});
    
    next();
};

export const validarSaldo = (req, res, next) => {
    const { senha, numero_conta } = req.query;
    const conta = bancodedados.contas.find(conta => conta.numero == numero_conta);

    const erroNumero = validarNumeroConta(numero_conta);
    if(erroNumero) return res.status(erroNumero.status).json({"message": erroNumero.message});


    const erroSenha = validarSenhaConta(conta, senha);
    if (erroSenha) return res.status(erroSenha.status).json({"message": erroSenha.message});

    next();
}

export const validarExtrato = (req, res, next) => {
    const { senha, numero_conta } = req.query;
    const conta = bancodedados.contas.find(conta => conta.numero == numero_conta);

    const erroNumero = validarNumeroConta(numero_conta);
    if(erroNumero) return res.status(erroNumero.status).json({"message": erroNumero.message});

    const erroSenha = validarSenhaConta(conta, senha);
    if (erroSenha) return res.status(erroSenha.status).json({"message": erroSenha.message});

    next();
}