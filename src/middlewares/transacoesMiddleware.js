import bancodedados from "../bancodedados.js";

export const verificarValor = (req, res, next) => {
    const { valor } = req.body;

    if (!valor) {
        return res.status(400).json({"message": "O valor do depósito é obrigatório."});
    };

    if (valor <= 0) {
        return res.status(400).json({"message": "O valor deve ser maior que zero."});
    }

    next();
};

export const verificarNumeroConta = (req, res, next) => {
    const { numero_conta } = req.body;

    if (!numero_conta) {
        return res.status(400).json({"message": "O número da conta é obrigatório."});
    };

    if (!bancodedados.contas.some(conta => conta.numero === numero_conta)) {
        return res.status(400).json({"message": "Não existe uma conta com esse número. Nem uma conta foi deletada"});
    }

    next();
};

export const verificarSenhaConta = (req, res, next) => {
    const { senha, numero_conta, numero_conta_origem } = req.body;
    const conta = bancodedados.contas.find(conta => conta.numero === numero_conta);
    const contaOrigem = bancodedados.contas.find(conta => conta.numero === numero_conta_origem);

    if (!senha) {
        return res.status(400).json({"message": "A senha é obrigatória."});
    };

    if (conta) {
        if (senha != conta.senha) {
            return res.status(400).json({"message": "Senha incorreta."});
        };
    };
    
    if (contaOrigem) {
        if (senha != contaOrigem.senha) {
            return res.status(400).json({"message": "Senha incorreta."});
        };
    }


    next();
};

export const verificarSaldoInsuficiente = (req, res, next) => {
    const { valor, numero_conta, numero_conta_origem } = req.body;
    const conta = bancodedados.contas.find(conta => conta.numero === numero_conta);
    const contaOrigem = bancodedados.contas.find(conta => conta.numero === numero_conta_origem);

    if (conta) {
        if (valor > conta.saldo ) {
            return res.status(400).json({"message": "Saldo insuficiente."});
        }
    };

    if (contaOrigem) {
        if (valor > contaOrigem.saldo ) {
            return res.status(400).json({"message": "Saldo insuficiente."});
        }
    };

    next();

};

export const verificarContasTransferencia = (req, res, next) => {
    const { numero_conta_origem, numero_conta_destino } = req.body;
    const contaOrigem = bancodedados.contas.find(conta => conta.numero === numero_conta_origem);
    const contaDestino = bancodedados.contas.find(conta => conta.numero === numero_conta_destino);

    if (!numero_conta_origem || !numero_conta_destino) {
        return res.status(400).json({"message": "As contas de origem e destino são obrigatórias"});
    };

    if (!contaOrigem) {
        return res.status(404).json({"message": "a conta de origem não existe."});
    };

    if (!contaDestino) {
        return res.status(404).json({"message": "a conta destino não existe."});
    };    

    next();
};