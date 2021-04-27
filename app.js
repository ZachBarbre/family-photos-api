const Koa = require('koa');

const app = new Koa;
const PORT = process.env.PORT || 3001;

app.use(async ctx => {
  ctx.body = {
    status: 'success',
    message: 'Hello, world!'
  };
})

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
});

module.exports = server;