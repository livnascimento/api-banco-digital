import express from 'express';

import {
    validarListagem,
    validarDados,
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
    validarExtrato,
    validarSaldo,
    validarSaque,
    validarTransferencia
} from './middlewares/transacoesMiddleware.js';

import { depositar, exibirExtrato, exibirSaldo, sacar, transferir } from './controllers/transacoesController.js';

const router = express.Router();

router.get('/contas', validarListagem, listarContas);
router.post('/contas', validarDados, cadastrarConta);
router.put('/contas/:numeroConta/usuario', validarDados, atualizarConta);
router.delete('/contas/:numeroConta', validarExclusao, excluirConta);
router.get('/contas/saldo', validarSaldo, exibirSaldo);
router.get('/contas/extrato', validarExtrato, exibirExtrato);

router.post('/transacoes/depositar', validarDeposito, depositar);
router.post('/transacoes/sacar', validarSaque, sacar);
router.post('/transacoes/transferir', validarTransferencia, transferir);

export default router;