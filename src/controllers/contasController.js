import bancodedados from "../bancodedados.js";

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
        ...req.body,
        saldo: 0
    })
    res.status(201).send();
};

export const atualizarConta = (req, res) => {
    const { numeroConta } = req.params;
    const usuario = bancodedados.contas.find(conta => conta.numero === numeroConta);
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    usuario.numero = usuario.numero;
    usuario.nome = nome;
    usuario.cpf= cpf ?? usuario.cpf;
    usuario.data_nascimento = data_nascimento;
    usuario.telefone = telefone;
    usuario.email = email ?? usuario.email;
    usuario.senha = senha;

    res.status(200).send();

}

export const excluirConta = (req, res) => {
    const { numeroConta } = req.params;
    const conta = bancodedados.contas.find(conta => conta.numero === numeroConta); 
    bancodedados.contas.splice(conta, 1);

    return res.status(200).send();
};

const gerarNumero = () => {
    const numero = (Math.random().toFixed(10) * 10000000000).toString();
    return numero.slice(0, 9).concat('-' + numero.slice(8, 9));
};