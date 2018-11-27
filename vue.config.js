module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
  productionSourceMap: false,
  css: {
    sourceMap: false
  }
}
