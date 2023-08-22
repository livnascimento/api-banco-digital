import bancodedados from "../bancodedados.js";
import { format } from 'date-fns';

export const depositar = (req, res) => {
    const { valor, numero_conta } = req.body;
    const conta = bancodedados.contas.find(conta => conta.numero === numero_conta);
    
    conta.saldo += valor;

    bancodedados.depositos.push({
        "data": format(new Date(), "yyyy'-'MM'-'dd HH':'mm':'ss"),
        "numero_conta": numero_conta,
        "valor": valor
    });

    return res.status(204).send();
};

export const sacar = (req, res) => {
    const { valor, numero_conta } = req.body;
    const conta = bancodedados.contas.find(conta => conta.numero === numero_conta);

    conta.saldo -= valor;

    bancodedados.saques.push({
        "data": format(new Date(), "yyyy'-'MM'-'dd HH':'mm':'ss"),
        "numero_conta": numero_conta,
        "valor": valor
    });

    return res.status(204).send();
};

export const transferir = (req, res) => {
    const { valor, numero_conta_origem, numero_conta_destino } = req.body;
    const contaOrigem = bancodedados.contas.find(conta => conta.numero === numero_conta_origem);
    const contaDestino = bancodedados.contas.find(conta => conta.numero === numero_conta_destino);

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;

    bancodedados.transferencias.push({
        "data": format(new Date(), "yyyy'-'MM'-'dd HH':'mm':'ss"),
        "numero_conta_origem": numero_conta_origem,
        "numero_conta_destino": numero_conta_destino,
        "valor": valor
    });

    return res.status(204).send();

};

export const exibirSaldo = (req, res) => {
    const { numero_conta } = req.query;
    const conta = bancodedados.contas.find(conta => conta.numero === numero_conta);

    return res.status(200).json({"saldo": conta.saldo});    
};

export const exibirExtrato = (req, res) => {
    const { numero_conta } = req.query;

    const depositos = bancodedados.depositos.filter(deposito => deposito.numero_conta === numero_conta);
    const saques = bancodedados.saques.filter(saque => saque.numero_conta === numero_conta);
    const transferenciasEnviadas = bancodedados.transferencias.filter(transferencia => transferencia.numero_conta_origem === numero_conta);
    const transferenciasRecebidas = bancodedados.transferencias.filter(transferencia => transferencia.numero_conta_destino === numero_conta);

    const extrato = {
        depositos,
        saques,
        transferenciasEnviadas,
        transferenciasRecebidas
    }

    res.status(200).json(extrato);
}