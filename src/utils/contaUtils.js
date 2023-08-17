import bancodedados from "../bancodedados.js";

import * as EmailValidator from 'email-validator';
import { CPF } from '@julioakira/cpf-cnpj-utils'

export const validarSenhaBanco = (senha) => {
    const senhaCorreta = bancodedados.banco.senha;
    if (!senha) {
        return { status: 401, message: "A senha é requerida." };
    }
    if (senha != senhaCorreta) {
        return { status: 401, message: "Senha incorreta" };
    };
};

export const validarNome = (nome) => {
    if (!nome) {
        return { status: 400, message: "O nome é obrigatório." };
    }
    if (nome.replaceAll(" ", "") == "") {
        return { status: 400, message: "Nome inválido." };
    }
};

export const validarTelefone = (telefone) => {
    if (!telefone) {
        return res.status(400).json({ "message": "O telefone é obrigatório." });
    }
    if (bancodedados.contas.some(conta => conta.telefone === telefone)) {
        return res.status(400).json({ "message": "Já existe uma conta cadastrada com esse telefone." });
    }
}

export const validarCpf = (cpf) => {
    if (!cpf) {
        return { status: 400, message: "O cpf é obrigatório." };
    };

    if (!CPF.Validate(cpf)) {
        return { status: 400, message: "CPF inválido." };
    };

    if (bancodedados.contas.some(conta => cpf === conta.cpf)) {
        return { status: 400, message: "Já existe uma conta cadastrada com esse cpf." };
    };

};

export const validarDataDeNascimento = (dataNascimento) => {
    if (!dataNascimento) {
        return { status: 400, message: "A data de nascimento é obrigatória." };
    }
};

export const validarEmail = (email) => {
    if (!email) {
        return { status: 400, message: "O e-mail é obrigatório." };
    }
    
    if (!EmailValidator.validate(email)) {
        return { status: 400, message: "E-mail inválido." };
    }
    
    if (bancodedados.contas.some(conta => email === conta.email)) {
        return { status: 400, message: "Já existe uma conta cadastrada com esse e-mail." };
    }
};

export const validarSenhaCadastro = (senha) => {
    if (!senha) {
        return { status: 400, message: "A senha é obrigatória." };
    };
    
    if (senha.length < 5) {
        return { status: 400, message: "A senha precisa ter, no mínimo, 5 caracteres." };
    };
};

export const validarSaldoZerado = (numeroConta) => {
    const saldo = bancodedados.contas.find(conta => conta.numero === numeroConta).saldo;
    if (saldo != 0) {
        return { status: 401, message: "Só é possível excluir uma conta quando o saldo for 0"};
    }
};