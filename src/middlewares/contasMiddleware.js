import { validarCpf, validarDataDeNascimento, validarEmail, validarNome, validarSaldoZerado, validarSenhaBanco, validarSenhaCadastro, validarTelefone } from "../utils/contaUtils.js";
import { validarNumeroConta } from "../utils/transacoesUtils.js";

export const validarListagem = (req, res, next) => {
    const { senha_banco } = req.query;
    
    const erro = validarSenhaBanco(senha_banco);
    if (erro) return res.status(erro.status).json({"message": erro.message});

    next();
};

export const validarCadastro = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha} = req.body;
    const validacoes = [() => validarNome(nome), () => validarCpf(cpf), () => validarDataDeNascimento(data_nascimento), () => validarTelefone(telefone), () => validarEmail(email), () => validarSenhaCadastro(senha)]

    for (let validacao of validacoes){
        const erro = validacao();
        if (erro) return res.status(erro.status).json({"message": erro.message});
    }

    next();
};

export const validarAtualizacao = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha} = req.body;
    const { numeroConta } = req.params;
    const validacoes = [() => validarNumeroConta(numeroConta), () => validarNome(nome), () => validarCpf(cpf, numeroConta), () => validarDataDeNascimento(data_nascimento), () => validarTelefone(telefone), () => validarEmail(email), () => validarSenhaCadastro(senha)]

    for (let validacao of validacoes){
        const erro = validacao();
        if (erro) return res.status(erro.status).json({"message": erro.message});
    }

    next();  
};


export const validarExclusao = (req, res, next) => {
    const { numeroConta } = req.params;
    const validacoes = [() => validarNumeroConta(numeroConta), () => validarSaldoZerado(numeroConta)];

    for (let validacao of validacoes){
        const erro = validacao();
        if (erro) return res.status(erro.status).json({"message": erro.message});
    }

    next();  
}; 
