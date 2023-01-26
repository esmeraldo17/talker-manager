const express = require('express');
const { randomBytes } = require('crypto');
const readFile = require('./utils/readfile');
const verifyEmail = require('./middleware/emailVerifyMiddleware');
const verifyPassword = require('./middleware/passwordVerifyMiddleware');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const data = await readFile();
  res.status(HTTP_OK_STATUS).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await readFile();
  const findData = data.find((talker) => talker.id === Number(id));

  if (!findData) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

  res.status(HTTP_OK_STATUS).json(findData);
});

app.post('/login', verifyEmail, verifyPassword, async (_req, res) => {
  const token = () => randomBytes(8).toString('hex');

  res.status(200).json({ token: token() });
});