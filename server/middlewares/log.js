module.exports = function() {
  return async (ctx, next) => {
    ctx.log.info('Got a request from %s for %s', ctx.request.ip, ctx.path);
    await next();
  }
}