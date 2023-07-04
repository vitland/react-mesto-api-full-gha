const { PORT = 3001 } = process.env;
const { DB_LINK = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const { SECRET = 'super-secret' } = process.env;

module.exports = { PORT, DB_LINK, SECRET };
