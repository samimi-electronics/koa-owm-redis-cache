require('dotenv').config();
module.exports = {
    port: process.env.PORT,
    owmApiKey: process.env.OWM_API_KEY,
    redisOptions: {
        host: process.env.REDIST_HOST || "127.0.0.1",
        port: parseInt(process.env.REDIS_PORT, 10) || 6379
    }
}
