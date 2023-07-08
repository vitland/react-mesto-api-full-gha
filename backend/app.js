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

const allowedOrigin = [
  'https://vmesto.nomoredomains.work',
  'https://api.vmesto.nomoredomains.work',
  'http://localhost:3000',
];
const corsOpts = (corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigin.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
});

app.use(cors(corsOpts));
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
