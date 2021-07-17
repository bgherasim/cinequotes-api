'use strict'

module.exports = async (fastify, opts) => {
  fastify.get('/', async function(request, reply) {
    const {filmId, quoteId} = request.params;
    const {language = 'en'} = request.query;

    const doc = await fastify.firestore.collection('films').
        doc(filmId).
        collection('quotes').
        doc(quoteId).
        get();

    return {
      actor: doc.data().actor,
      quote: doc.data()[language],
    };
  });
}