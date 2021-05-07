require('dotenv').config();
const Koa = require('koa');
const koaBody = require('koa-body');

const indexRoute = require('./routes/index');
const moviesRoute = require('./routes/movies');
const photosRoute = require('./routes/photos');

const app = new Koa;
const PORT = process.env.PORT || 3001;

app.use(koaBody())
app.use(indexRoute.routes())
app.use(moviesRoute.routes())
app.use(photosRoute.routes())

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
});

module.exports = server;