'use strict';

module.exports = async (fastify, opts) => {
  const {httpErrors} = fastify;

  fastify.get('/', async function(request, reply) {
    const {filmId, quoteId} = request.params;
    const {language = 'en'} = request.query;
    const doc = await fastify.firestore.collection('films').
        doc(filmId).
        collection('quotes').
        doc(quoteId).
        get();

    if (!doc.data()) throw httpErrors.notFound('Invalid quote id');

    return {
      actor: doc.data().actor,
      quote: doc.data()[language],
    };
  });
};