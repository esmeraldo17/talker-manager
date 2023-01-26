const verifyEmail = (req, res, next) => {
    const { email } = req.body;
    const validation = /^\S+@\S+\.\S+$/;
    
    if (!email) {
        res.status(400).json({ message: 'O campo "email" é obrigatório' });
        return;
    }

    if (!validation.test(email)) {
        res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
        return;
    }

    next();
};

module.exports = verifyEmail;