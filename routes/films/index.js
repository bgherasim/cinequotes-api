'use strict';

module.exports = async function(fastify, opts) {
  fastify.get('/', async function(request, reply) {
    const querySnapshot = await fastify.firestore.collection('films').get();
    const films = [];
    querySnapshot.forEach((doc) => {
      films.push({
        id: doc.id,
        title: doc.data().title,
      });
    });

    return films;
  });
};
