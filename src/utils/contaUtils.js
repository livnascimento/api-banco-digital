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

    if (!cpf) {
        return { status: 400, message: "O CPF é obrigatório." };
    };
    
    if (!CPF.Validate(cpf)) {
        return { status: 400, message: "CPF inválido." };
    };
    
    const cpfExistente = bancodedados.contas.find(conta => cpf === conta.usuario.cpf);

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

export const validarEmail = (email, numeroConta = false) => {

    if (!email) {
        return { status: 400, message: "O e-mail é obrigatório." };
    }
    
    if (!EmailValidator.validate(email)) {
        return { status: 400, message: "E-mail inválido." };
    }

    const emailExistente = bancodedados.contas.find(conta => email === conta.usuario.email);
    
    if (emailExistente) {
        if (numeroConta) {
            const conta = bancodedados.contas.find(conta => conta.numero == numeroConta);
            const indexConta = bancodedados.contas.indexOf(conta);
            const indexEmail = bancodedados.contas.indexOf(emailExistente);
            if (indexConta != indexEmail) return { status: 400, message: "Já existe uma conta cadastrada com esse e-mail." };
        } else {
            return { status: 400, message: "Já existe uma conta cadastrada com esse e-mail." };
        }
    }
    return false;
}

export const validarSenhaCadastro = (senha) => {
    if (!senha) {
        return { status: 400, message: "A senha é obrigatória." };
    };

    return false;
}

export const validarSaldoZerado = (numeroConta) => {
    const conta = bancodedados.contas.find(conta => conta.numero === numeroConta);
    const saldo = conta.saldo;
    if (saldo != 0) {
        return { status: 401, message: "Só é possível excluir uma conta quando o saldo for 0"};
    }
}

export const validarDadosIguais = (body, numeroConta) => {
    const conta = bancodedados.contas.find(conta => conta.numero == numeroConta).usuario;

    if (
        conta.nome == body.nome & 
        conta.cpf == body.cpf & 
        conta.data_nascimento == body.data_nascimento &
        conta.telefone == body.telefone & 
        conta.email == body.email & 
        conta.senha == body.senha
        ) 
    {
        return { status: 400, message: "Não foi possível altualizar a conta, pois todos os dados são iguais aos originais."};
    }
}

export const gerarNumero = () => {
    const numero = (Math.random().toFixed(10) * 10000000000).toString();
    return numero.slice(0, 9).concat('-' + numero.slice(8, 9));
};