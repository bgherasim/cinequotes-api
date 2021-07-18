'use strict';

const firebase_tools = require('firebase-tools');

const clearDB = async () => {
  await firebase_tools.firestore.delete('films', {
    recursive: true,
    yes: true,
    project: 'dummy',
  });
};

module.exports = clearDB;