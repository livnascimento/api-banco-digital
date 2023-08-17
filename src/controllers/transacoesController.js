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

    return res.status(200).send();
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

    return res.status(200).send();
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

    return res.status(200).send(bancodedados);

};