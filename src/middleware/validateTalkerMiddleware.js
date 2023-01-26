const verifyAuthorization = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401).json({ message: 'Token não encontrado' });
        return;
    }

    if (authorization.length !== 16 || typeof authorization !== 'string') {
        res.status(401).json({ message: 'Token inválido' });
        return;
    }

    next();
};

const verifyName = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        res.status(400).json({ message: 'O campo "name" é obrigatório' });
        return;
    }

    if (name.length < 3) {
        res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
        return;
    }

    next();
};

const verifyAge = (req, res, next) => {
    const { age } = req.body;

    if (!age) {
        res.status(400).json({ message: 'O campo "age" é obrigatório' });
        return;
    }

    if (!Number.isInteger(age)) {
        return res.status(400).json({ message: 'O campo "age" deve ser um numero inteiro ' });
      }

    if (age < 18) {
        res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
        return;
    }

    next();
};

const verifyTalk = (req, res, next) => {
    const { talk } = req.body;

    if (!talk) {
        res.status(400).json({ message: 'O campo "talk" é obrigatório' });
        return;
    }

    next();
};

const verifywatchedAt = (req, res, next) => {
    const { watchedAt } = req.body.talk;

    // dataValidation retirado do codigo de Thiago Lopes
    const dataValitation = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

    if (!watchedAt) {
        res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
        return;
    }

    if (!dataValitation.test(watchedAt)) {
        res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
        return;
    }

    next();
};

const verifyRate = (req, res, next) => {
    const { rate } = req.body.talk;

    if (!rate) {
        res.status(400).json({ message: 'O campo "rate" é obrigatório' });
        return;
    }

    if (rate < 1 || rate > 5) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }

    if (!Number.isInteger(rate)) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }

    next();
};

module.exports = {
    verifyAuthorization,
    verifyName,
    verifyAge,
    verifyTalk,
    verifywatchedAt,
    verifyRate,
};