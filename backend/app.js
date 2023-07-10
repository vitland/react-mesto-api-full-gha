require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const { errorsHandler } = require('./errors/errorsHandler');

const { PORT = 3000, DB_LINK = 'mongodb://127.0.0.1:27017/mestodb' } =
  process.env;
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('cors');
const app = express();

mongoose
  .connect(DB_LINK, {
    useNewUrlParser: true,
    autoIndex: true,
  })
  .then(() => console.log('mongo UP'))
  .catch((err) => console.log(err));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(requestLogger);

app.use(cors({ origin: true, credentials: true }));
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use('/', router);
app.use(errorLogger);
// celebrate обработчик ошибок
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`Сревер запущен на ${PORT} порту`);
});
