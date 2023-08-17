import express from 'express';

import { validarSenha, validarNumeroConta, verificarCpf, validarCpf, validarDataDeNascimento, verificarEmail, validarEmail, validarNome, validarSenhaCadastro, validarTelefone, verificarSaldo } from './middlewares/contasMiddleware.js';
import { listarContas, cadastrarConta, atualizarConta, excluirConta } from './controllers/contasController.js';

import { verificarValor, verificarNumeroConta, verificarSenhaConta, verificarSaldoInsuficiente, verificarContasTransferencia } from './middlewares/transacoesMiddleware.js';
import { depositar, sacar, transferir } from './controllers/transacoesController.js';

const router = express();

router.get('/contas', validarSenha, listarContas);
router.post('/contas', validarSenha, verificarCpf, validarCpf, validarDataDeNascimento, verificarEmail, validarEmail, validarNome, validarSenhaCadastro, validarTelefone, cadastrarConta);
router.put('/contas/:numeroConta/usuario', validarSenha, validarNumeroConta, validarCpf, validarDataDeNascimento, validarEmail, validarNome, validarSenhaCadastro, validarTelefone, atualizarConta);
router.delete('/contas/:numeroConta', validarSenha, validarNumeroConta, verificarSaldo, excluirConta);

router.post('/transacoes/depositar', verificarNumeroConta, verificarValor, depositar);
router.post('/transacoes/sacar', verificarNumeroConta, verificarValor, verificarSenhaConta, verificarSaldoInsuficiente, sacar);
router.post('/transacoes/transferir', verificarContasTransferencia, verificarSenhaConta, verificarSaldoInsuficiente, verificarValor, transferir);

export default router;