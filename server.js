// API Configuration
const config = require('./config/config');

// Koa
const Koa = require('koa');
const koaBody = require('koa-body');

// Instantiating application
const app = new Koa();

const weatherApi = require('./routers/weather');

// Middlewares
app.use(koaBody());

// Using weather api routes
app.use(weatherApi.routes());

// Bootstrap server
app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`);
});

