module.exports = {
  devServer: {
    proxy: 'http://localhost:3003'//设置代理，默认转到3001的端口上请求
  }
}