const redis = require('redis');
const { redisOptions } = require('../config/config');

const client = redis.createClient({
    host: redisOptions.host,
    port: redisOptions.port
});

// Making redis promise based instead of callback based
const {promisify} = require('util');
const getDataDb = promisify(client.get).bind(client);
const setDataDb = promisify(client.set).bind(client);

// Application will crash if redis connection was refused
client.on('error', (err) => {
    throw new Error(err)
});

module.exports = {
    getDataDb,
    setDataDb
};

