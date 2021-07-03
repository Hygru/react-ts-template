/* eslint-disable indent */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const getCssLoaders = (importLoaders) => [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 生产环境需要把css样式抽离到单独的css文件中
    {
        loader: 'css-loader',
        options: {
            modules: true, // 默认就是 false, 若要开启，可在官网具体查看可配置项
            sourceMap: isDev, // 开启后与 devtool 设置一致, 开发环境开启，生产环境关闭
            importLoaders // 指定在 CSS loader 处理前使用的 laoder 数量
        }
    },
    {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                ident: 'postcss',
                plugins: [
                    'postcss-flexbugs-fixes',
                    [
                        'postcss-preset-env',
                        {
                            autoprefixer: {
                                grid: true,
                                flexbox: 'no-2009'
                            },
                            stage: 3
                        }
                    ],
                    'postcss-normalize'
                ],
                sourceMap: true
            }
        }
    }
]

module.exports = {
    entry: {
        app: path.resolve(__dirname, '../src/index.tsx')
    },
    output: {
        filename: 'js/[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(tsx?|js)$/,
                loader: 'babel-loader',
                options: { cacheDirectory: true },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: getCssLoaders(1)
            },
            {
                test: /\.less$/,
                use: [
                    ...getCssLoaders(2),
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: isDev
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    ...getCssLoaders(2),
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDev
                        }
                    }
                ]
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024,
                            name: '[name].[contenthash:8].[ext]',
                            outputPath: 'assets/images'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[contenthash:8].[ext]',
                            outputPath: 'assets/fonts'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'] // 自动判断后缀名，引入时可以不用带后缀名
    },
    optimization: {
        minimize: !isDev,
        minimizer: [
            !isDev &&
                new TerserWebpackPlugin({
                    extractComments: false,
                    terserOptions: {
                        compress: { pure_funcs: ['console.log'] }
                    }
                }),
            !isDev && new OptimizeCssAssetsPlugin()
        ].filter(Boolean)
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html',
            cache: false
        }),
        new WebpackBar({
            name: '🌈 Happy build .....',
            color: '#53eaff'
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: path.resolve(__dirname, '../tsconfig.json')
            }
        }),
        // new HardSourceWebpackPlugin(),
        // new HardSourceWebpackPlugin.ExcludeModulePlugin([]), // webpack 5+ 需要加上这个配置
        ...(!isDev
            ? [
                  new MiniCssExtractPlugin({
                      filename: 'css/[name].[contenthash:8].css',
                      chunkFilename: 'css/[name].[contenthash:8].css',
                      ignoreOrder: false
                  })
              ]
            : [])
    ]
}
