const { createClient } = require("redis")

const redisCli = new createClient({ legacyMode : true })

redisCli.on('connect', () => {
    console.log('Redis has initd')
})
redisCli.on('error', err => {
    console.error(err)
})

module.exports = {
    redisCli
}