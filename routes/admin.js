const Router = require('@koa/router')

const admin = new Router

admin.post('/api/v1/admin', async (ctx) => {
  const password = ctx.request.body.password
  if(password === process.env.ADMIN_PASS) {
    ctx.status = 200;
    ctx.body = {
      admin: true
    }
  } else {
    ctx.status = 403 
    ctx.body = {
      message: 'Incorrect Password'
    }
  }
})

module.exports = admin;