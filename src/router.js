import express from 'express';

import {
    validarListagem,
    validarCadastro,
    validarAtualizacao,
    validarExclusao
} from './middlewares/contasMiddleware.js';

import { 
    listarContas, 
    cadastrarConta, 
    atualizarConta, 
    excluirConta 
} from './controllers/contasController.js';

import { 
    validarDeposito,
    validarSaldoExtrato,
    validarSaque,
    validarTransferencia
} from './middlewares/transacoesMiddleware.js';

import { depositar, exibirExtrato, exibirSaldo, sacar, transferir } from './controllers/transacoesController.js';

const router = express.Router();

router.get('/contas', validarListagem, listarContas);
router.post('/contas', validarCadastro, cadastrarConta);
router.put('/contas/:numeroConta/usuario', validarAtualizacao, atualizarConta);
router.delete('/contas/:numeroConta', validarExclusao, excluirConta);

router.get('/contas/saldo', validarSaldoExtrato, exibirSaldo);
router.get('/contas/extrato', validarSaldoExtrato, exibirExtrato);

router.post('/transacoes/depositar', validarDeposito, depositar);
router.post('/transacoes/sacar', validarSaque, sacar);
router.post('/transacoes/transferir', validarTransferencia, transferir);

export default router;