require('dotenv').config();
const Koa = require('koa');
const koaBody = require('koa-body');

const indexRoute = require('./routes/index');
const photosRoute = require('./routes/photos');

const app = new Koa;
const PORT = process.env.PORT || 3001;

app.use(koaBody({ multipart: true }))
app.use(indexRoute.routes())
app.use(photosRoute.routes())

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}, NODE_ENV=${process.env.NODE_ENV}`)
});

module.exports = server;