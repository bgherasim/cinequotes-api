const fp = require('fastify-plugin');

const pubsub = require('@google-cloud/pubsub');
const grpc = require('@grpc/grpc-js');
const [pubsubHost, pubsubPort] = process.env.PUBSUB_EMULATOR_HOST.split(':');

const options = {
  projectId: 'dummy',
  servicePath: pubsubHost,
  port: pubsubPort,
  sslCreds: grpc.credentials.createInsecure(),
};

module.exports = fp(async (fastify, opts) => {
  fastify.decorate('pubsub', new pubsub.PubSub(options));
});
