import bancodedados from "../bancodedados.js";
import * as EmailValidator from 'email-validator';
import { CPF } from '@julioakira/cpf-cnpj-utils'

export const validarSenha = (req, res, next) => {
    const { senha_banco } = req.query;
    const senhaCorreta = bancodedados.banco.senha;
    if (!senha_banco) {
        return res.status(401).json({"message": "A senha é requerida."});
    }
    if (senha_banco != senhaCorreta) {
        return res.status(401).json({"message": "Senha incorreta"});
    };
    next();
};

export const validarNome = (req, res, next) => {
    const { nome } = req.body;
    if (!nome) {
        return res.status(400).json({"message": "O nome é obrigatório."})
    }
    if (nome.replaceAll(" ", "") == "") {
        return res.status(400).json({"message": "Nome inválido"});
    }
    next();
};

export const validarTelefone = (req, res, next) => {
    const { telefone } = req.body;
    if (!telefone) {
        return res.status(400).json({"message": "O telefone é obrigatório."});
    }
    if (bancodedados.contas.some(conta => conta.telefone === telefone)){
        return res.status(400).json({"message": "Já existe uma conta cadastrada com esse telefone."});
    }
    next();
}

export const verificarCpf = (req, res, next) => {
    const { cpf } = req.body;

    if (!cpf) {
        return res.status(400).json({"message": "O cpf é obrigatório."});
    };

    next();
}

export const validarCpf = (req, res, next) => {
    const { cpf } = req.body;

    if (cpf) {
        if (!CPF.Validate(cpf)) {
            return res.status(400).json({"message": "Cpf inválido."});
        };
    
        if (bancodedados.contas.some(conta => cpf === conta.cpf)){
            return res.status(400).json({"message": "Já existe uma conta cadastrada com esse cpf."});
        };
    }
    
    next();
    
};

export const validarDataDeNascimento = (req, res, next) => {
    const { data_nascimento } = req.body;
    if (!data_nascimento) {
        return res.status(400).json({"message": "A data de nascimento é obrigatória."});
    }
    next();
};

export const verificarEmail = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({"message": "O email é obrigatório."});
    }

    next();
}

export const validarEmail = (req, res, next) => {
    const { email } = req.body;

    if (email) {
        if (!EmailValidator.validate(email)) {
            return res.status(400).json({"message": "E-mail inválido."});
        }
    
        if (bancodedados.contas.some(conta => email === conta.email)){
            return res.status(400).json({"message": "Já existe uma conta cadastrada com esse email."});
        }
    }

    next();
};

export const validarSenhaCadastro = (req, res, next) => {
    const { senha } = req.body;

    if (!senha) {
        return res.status(400).json({"message": "A senha é obrigatória."});
    };

    if (senha.length < 5) {
        return res.status(400).json({"message": "A senha precisa ter, no mínimo, 5 caracteres."})
    };

    next();
};

export const validarNumeroConta = (req, res, next) => {
    const { numeroConta } = req.params;

    if (!bancodedados.contas.some(conta => conta.numero === numeroConta)) {
        return res.status(404).json({"message": "Não existe uma conta com esse número"});
    };

    next();
};

export const verificarSaldo = (req, res, next) => {
    const { numeroConta } = req.params;
    const conta = bancodedados.contas.find(conta => conta.numero === numeroConta);

    if (conta.saldo != 0) {
        return res.status(400).json({"message": "A conta só pode ser removida se o saldo for zero."});
    };

    next();
}