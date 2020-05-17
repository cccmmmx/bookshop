module.exports = {
    publicPath: '/',
    devServer:{
        host:'127.0.0.1',
        proxy: {
            '/api': {
                target: 'http://120.25.232.119/',
                // target:'http://192.168.1.103:8082/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                }
            }
        }
    }
}