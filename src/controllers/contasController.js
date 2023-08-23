import bancodedados from "../bancodedados.js";
import { gerarNumero } from "../utils/contaUtils.js";

export const listarContas = (req, res) => {
    res.status(200).json(bancodedados.contas);
};

export const cadastrarConta = (req, res) => {
    let numero = gerarNumero();
    while (bancodedados.contas.some(conta => conta.numero === numero)) {
        numero = gerarNumero();
    };
    bancodedados.contas.push({
        numero,
        saldo: 0,
        usuario: {...req.body}
    })
    res.status(201).send();
};

export const atualizarConta = (req, res) => {
    const { numeroConta } = req.params;
    const conta = bancodedados.contas.find(conta => conta.numero === numeroConta);
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    conta.usuario.nome = nome;
    conta.usuario.cpf = cpf;
    conta.usuario.data_nascimento = data_nascimento;
    conta.usuario.telefone = telefone;
    conta.usuario.email = email;
    conta.usuario.senha = senha;

    res.status(204).send();

}

export const excluirConta = (req, res) => {
    const { numeroConta } = req.params;
    const conta = bancodedados.contas.find(conta => conta.numero === numeroConta); 
    bancodedados.contas.splice(bancodedados.contas.indexOf(conta), 1);

    return res.status(204).send();
};
