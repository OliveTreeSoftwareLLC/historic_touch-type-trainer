
module.exports = {
    entry: './app/index.jsx',
    output: {
        publicPath: 'http://localhost:81/assets'
    },
    module: {
        loaders: [
            { test: /\.css$/, loaders: ["style", "css"] },
            { test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM&harmony' }
        ]
    },
    externals: {
        'react': 'React'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}