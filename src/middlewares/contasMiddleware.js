import bancodedados from "../bancodedados.js";

import { validarCpf, validarDataDeNascimento, validarEmail, validarNome, validarSaldoZerado, validarSenhaBanco, validarSenhaCadastro, validarTelefone } from "../utils/contaUtils.js";
import { validarNumeroConta } from "../utils/transacoesUtils.js";
import { validarSaldo } from "./transacoesMiddleware.js";

export const validarListagem = (req, res, next) => {
    const { senha_banco } = req.query;
    
    const erro = validarSenhaBanco(senha_banco);
    if (erro) return res.status(erro.status).json({"message": erro.message});

    next();
};

export const validarDados = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha} = req.body;
    const errors = [];

    errors.push(validarNome(nome));
    errors.push(validarCpf(cpf));
    errors.push(validarDataDeNascimento(data_nascimento));
    errors.push(validarTelefone(telefone));
    errors.push(validarEmail(email));
    errors.push(validarSenhaCadastro(senha));

    const error = errors.find(erro => erro != undefined);

    if (error) {
        return res.status(error.status).json({"message": error.message});
    }

    next();
};

export const validarExclusao = (req, res, next) => {
    const {numeroConta} = req.params;
    const errors = [];
    
    errors.push(validarNumeroConta(numeroConta));
    errors.push(validarSaldoZerado(numeroConta));

    const error = errors.find(erro => erro != undefined);

    if (error) {
        return res.status(error.status).json({"message": error.message});
    }

    next();

}
