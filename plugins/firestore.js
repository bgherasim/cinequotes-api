const fp = require('fastify-plugin');

module.exports = fp(async (fastify, opts) => {

  fastify.decorate('firestore', require('../store/firestore'));
});
