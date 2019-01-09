const Koa = require('koa');
const IO = require('koa-socket');
const koaSend = require('koa-send');
const koaStatic = require('koa-static');
const path = require('path');
var koaLogger = require('koa-logger');


const log = require('./middlewares/log');
const koaBunyanLogger = require('koa-bunyan-logger');
const app = new Koa()

// app.use(koaBunyanLogger())
// app.use(koaBunyanLogger.requestLogger({
//   formatRequestMessage
// }));
// app.use(log())
app.use(koaLogger())

app.use(async (ctx, next) => {
  if (!/\./.test(ctx.request.url)) {
    await koaSend(
      ctx,
      'index.html',
      {
        root: path.join(__dirname, '../public'),
        maxage: 1000 * 60 * 60 * 24 * 7,
        gzip: true
      }
    )
  } else {
    await next()
  }
})

// 静态文件访问
app.use(koaStatic(
  path.join(__dirname, '../public'),
  {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    gzip: true
  }
));

module.exports = app;