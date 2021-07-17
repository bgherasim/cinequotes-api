'use strict'

module.exports = async (fastify, opts) => {
  fastify.get('/', async function(request, reply) {
    const {filmId} = request.params;
    const {language = 'en'} = request.query;

    const querySnapshot = await fastify.firestore.collection('films').
        doc(filmId).
        collection('quotes').
        get();
    const quotes = [];
    querySnapshot.forEach((doc) => {
      quotes.push({
        id: doc.id,
        // actor: doc.data().actor,
        quote: doc.data()[language],
      });
    });

    return quotes;
  });

  fastify.post('/', async function(request, reply) {
    const {filmId} = request.params;
    const {actor, quote} = request.body;
    const {language = 'en'} = request.query;

    const document = {
      actor: actor,
    };

    document[language] = quote;

    const res = await fastify.firestore.collection('films').
        doc(filmId).
        collection('quotes').
        add(document);

    const dataBuffer = Buffer.from(JSON.stringify({
      ...document,
      quoteId: res.id,
      filmId,
    }));
    await fastify.pubsub.topic('translate').publish(dataBuffer);

    return {
      id: res.id,
    };
  });
}