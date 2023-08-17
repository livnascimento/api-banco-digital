import express from 'express';

import {
    validarSenha,
    validarNumeroConta,
    verificarCpf, validarCpf,
    validarDataDeNascimento,
    verificarEmail,
    validarEmail,
    validarNome,
    validarSenhaCadastro,
    validarTelefone,
    verificarSaldo
} from './middlewares/contasMiddleware.js';

import { 
    listarContas, 
    cadastrarConta, 
    atualizarConta, 
    excluirConta 
} from './controllers/contasController.js';

import { 
    validarDeposito,
    validarExtrato,
    validarSaldo,
    validarSaque,
    validarTransferencia
} from './middlewares/transacoesMiddleware.js';

import { depositar, exibirExtrato, exibirSaldo, sacar, transferir } from './controllers/transacoesController.js';

const router = express.Router();

router.get('/contas', validarSenha, listarContas);
router.post('/contas', validarSenha, verificarCpf, validarCpf, validarDataDeNascimento, verificarEmail, validarEmail, validarNome, validarSenhaCadastro, validarTelefone, cadastrarConta);
router.put('/contas/:numeroConta/usuario', validarSenha, validarNumeroConta, validarCpf, validarDataDeNascimento, validarEmail, validarNome, validarSenhaCadastro, validarTelefone, atualizarConta);
router.delete('/contas/:numeroConta', validarSenha, validarNumeroConta, verificarSaldo, excluirConta);
router.get('/contas/saldo', validarSaldo, exibirSaldo);
router.get('/contas/extrato', validarExtrato, exibirExtrato);

router.post('/transacoes/depositar', validarDeposito, depositar);
router.post('/transacoes/sacar', validarSaque, sacar);
router.post('/transacoes/transferir', validarTransferencia, transferir);

export default router;