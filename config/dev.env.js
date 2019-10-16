'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    //BASE_URL:'"http://123.207.245.169:8022/"'
    BASE_URL:'"http://47.95.1.85/"'
})
