module.exports={
  publicPath:'/zhuzhu',
  devServer:{
    proxy:{
      '/api2': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api2': '/mock'
        }
      },
      '/api':{
        target:'http://39.97.33.178',
        changeOrigin:true
      }
    }
  }
}