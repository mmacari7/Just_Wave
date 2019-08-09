const nrp = require('node-redis-pubsub');

const config = {
    port: 6379,
    scope: 'api'
};

module.exports = new nrp(config);