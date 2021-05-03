const Koa = require('koa');
require('dotenv').config();

const indexRoute = require('./routes/index');
const moviesRoute = require('./routes/movies');

const app = new Koa;
const PORT = process.env.PORT || 3001;

app.use(indexRoute.routes())
app.use(moviesRoute.routes())

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
});

module.exports = server;