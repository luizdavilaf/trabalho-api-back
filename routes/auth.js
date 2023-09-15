const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Rota de login
router.post('/login', (req, res) => {
    const { username, password } = req.body;


    if (username === 'admin' && password === 'admin') {

        const token = jwt.sign({ username }, 'chave-secreta');
        console.log("logou")
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Login ou senha incorretos' });
    }
});

function verifyToken(req, res, next) {
    const token = req.headers.authorization;


    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, 'chave-secreta', (err, decoded) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ message: 'Token inválido' });
        }
        req.user = decoded;
        console.log(req.user)
        next();
    });
}

// Rota protegida
router.get('/recurso-protegido', verifyToken, (req, res) => {

    res.json({ message: 'Você acessou o recurso protegido' });
});

// Rota desprotegida
router.get('/recurso-desprotegida', (req, res) => {
    res.json({ message: 'Você acessou o recurso desprotegido' })
}


)




module.exports = router;