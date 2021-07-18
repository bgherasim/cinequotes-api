'use strict';

// This file contains code that we reuse
// between our tests.

const Fastify = require('fastify');
const fp = require('fastify-plugin');

const App = require('../app');

const firestore = require('../store/firestore');
const seed = require('../helpers/seedFirestore');
const clear = require('../helpers/clearFirestore');
const testData = require('./testData.json');

// Fill in this config with all the configurations
// needed for testing the application
function config() {
  return {};
}

// automatically build and tear down our instance
function build(t) {
  const app = Fastify();

  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  app.register(fp(App), config());

  // tear down our app after we are done
  t.teardown(app.close.bind(app));

  return app;
}

async function seedDb() {
  await clear();
  await seed(firestore, testData);
}

module.exports = {
  config,
  build,
  seedDb,
};
