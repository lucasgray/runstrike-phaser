var path = require('path')
var webpack = require('webpack')

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
var pixi = path.join(phaserModule, 'build/custom/pixi.js')
var p2 = path.join(phaserModule, 'build/custom/p2.js')

const PATHS = {
    src: path.join(__dirname, 'src'),
    js: path.join(__dirname, 'src'),
    game: path.join(__dirname, 'src/js/Game.ts'),
    img: path.join(__dirname, 'src/img'),
    audio: path.join(__dirname, 'src/audio'),
    sounds: path.join(__dirname, 'src/audio/sounds'),
    music: path.join(__dirname, 'src/audio/music'),
    styles: path.join(__dirname, 'src/css'),
    build: path.join(__dirname, 'dist')
}


module.exports = {
    entry: {
        app: [
            'babel-polyfill',
            PATHS.game
        ],
        vendor: ['pixi', 'p2', 'phaser', 'webfontloader']
    },
    devtool:  'source-map',
    output: {
        pathinfo: true,
        path: PATHS.build,
        publicPath: './dist/',
        filename: 'bundle.js'
    },
    watch: false,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'/* chunkName= */, filename: 'vendor.bundle.js'/* filename= */}),
        new webpack.optimize.UglifyJsPlugin({
            drop_console: true,
            minimize: true,
            output: {
                comments: false
            }
        })
    ],
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader', include: PATHS.js },
            { test: /\.js$/, use: ['babel-loader'], include: PATHS.js },
            { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
            { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
            { test: /p2\.js/, use: ['expose-loader?p2'] },
            { test: /\.(mp3|wav|ogg)$/,  use: [ 'file-loader' ], include: PATHS.music },
            { test: /\.(mp3|wav|ogg)$/,  use: [ 'file-loader' ], include: PATHS.sounds },
            { test: /\.(png|svg|jpg|gif)$/,  use: [ 'file-loader' ], include: PATHS.img },
            { test: /\.(eot|svg|ttf|woff|woff2|css)$/, use: [ "file-loader?name=[name].[ext]" ], include: PATHS.styles }
        ]
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    resolve: {
        alias: {
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2
        },
        extensions: [ '.ts', '.tsx', '.js' ]
    }
}
