const {Firestore} = require('@google-cloud/firestore');
const initialData = require('./initialData.json');
const firestore = new Firestore({
  projectId: 'dummy',
});

const filmsCollection = firestore.collection('films');

const seed = async () => {
  for (const film of initialData) {
    let res = await filmsCollection.add({
      title: film.title,
    });

    for (const quote of (film.quotes || [])) {
      await filmsCollection.doc(res.id).collection('quotes').add({
        actor: quote.actor,
        en: quote.en,
        fr: quote.fr,
      });
    }
  }
};

seed();






