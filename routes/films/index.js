'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
  	const querySnapshot = await fastify.firestore.collection("films").get();
		const films = [];
		querySnapshot.forEach((doc) => {
			films.push({
				id: doc.id,
				title: doc.data().title
			})
		});

		return films;
  })

	fastify.get('/:filmId/quotes', async function (request, reply) { //TODO move to separate route
		const { filmId } = request.params;
		const { language = "en" } = request.query;

		const querySnapshot = await fastify.firestore.collection("films").doc(filmId).collection("quotes").get();
		const quotes = [];
		querySnapshot.forEach((doc) => {
			quotes.push({
				id: doc.id,
				// actor: doc.data().actor,
				quote: doc.data()[language]
			})
		});

		return quotes;
	})

	fastify.get('/:filmId/quotes/:quoteId', async function (request, reply) { //TODO move to separate route
		const { filmId, quoteId } = request.params;
		const { language = "en" } = request.query;

		const doc = await fastify.firestore.collection("films").doc(filmId).collection("quotes").doc(quoteId).get();

		return {
			actor: doc.data().actor,
			quote: doc.data()[language]
		};
	})

	fastify.post('/:filmId/quotes', async function (request, reply) { //TODO move to separate route
		const { filmId } = request.params;
		const { actor, quote } = request.body;

		const document = {
			en: quote, //TODO support multiple languages
			actor: actor
		}

		const res = await fastify.firestore.collection("films").doc(filmId).collection("quotes").add(document);

		const dataBuffer = Buffer.from(JSON.stringify({
			...document,
			quoteId: res.id,
			filmId
		}));
		await fastify.pubsub.topic("translate").publish(dataBuffer);

		return {
			id: res.id
		};
	})
}
