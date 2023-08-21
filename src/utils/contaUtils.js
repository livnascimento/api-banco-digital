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
}

export const validarNome = (nome) => {
    if (!nome) {
        return { status: 400, message: "O nome é obrigatório." };
    }
    if (nome.replaceAll(" ", "") == "") {
        return { status: 400, message: "Nome inválido." };
    }
}

export const validarTelefone = (telefone) => {
    if (!telefone) {
        return { status: 400, message: "O telefone é obrigatório." };
    }
}

export const validarCpf = (cpf, numeroConta = false) => {

    const cpfExistente = bancodedados.contas.find(conta => cpf === conta.usuario.cpf);

    if (!cpf) {
        return { status: 400, message: "O CPF é obrigatório." };
    };

    if (!CPF.Validate(cpf)) {
        return { status: 400, message: "CPF inválido." };
    };

    if (cpfExistente) {
        if (numeroConta) {
            const conta = bancodedados.contas.find(conta => conta.numero == numeroConta);
            const indexConta = bancodedados.contas.indexOf(conta);
            const indexCpf = bancodedados.contas.indexOf(cpfExistente);
            if (indexConta != indexCpf) return { status: 400, message: "Já existe uma conta cadastrada com esse CPF." };
        } else {
            return { status: 400, message: "Já existe uma conta cadastrada com esse CPF." };
        }
    };

    return false;
}

export const validarDataDeNascimento = (dataNascimento) => {
    if (!dataNascimento) {
        return { status: 400, message: "A data de nascimento é obrigatória." };
    }
    return false;
}

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
    return false;
}

export const validarSenhaCadastro = (senha) => {
    if (!senha) {
        return { status: 400, message: "A senha é obrigatória." };
    };
    
    if (senha.length < 5) {
        return { status: 400, message: "A senha precisa ter, no mínimo, 5 caracteres." };
    };
    return false;
}

export const validarSaldoZerado = (numeroConta) => {
    const conta = bancodedados.contas.find(conta => conta.numero === numeroConta);
    const saldo = conta.saldo;
    if (saldo != 0) {
        return { status: 401, message: "Só é possível excluir uma conta quando o saldo for 0"};
    }
    return false;
}

