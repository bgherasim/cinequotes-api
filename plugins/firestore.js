const fp = require("fastify-plugin");
const { Firestore } = require('@google-cloud/firestore');

module.exports = fp(async (fastify, opts) => {

	const firestore = new Firestore({
		projectId: 'dummy'
	});

	fastify.decorate("firestore", firestore);
})
