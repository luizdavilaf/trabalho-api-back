const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: 'http://localhost:19006',
    optionsSuccessStatus: 200, // algumas implementações antigas do navegador podem precisar disso
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});