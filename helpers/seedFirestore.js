'use strict';

const seed = async (firestore, initialData) => {
  const filmsCollection = firestore.collection('films');

  for (const film of initialData) {
    await filmsCollection.doc(film._id).set({
      title: film.title,
    });

    for (const quote of (film.quotes || [])) {
      await filmsCollection.doc(film._id).collection('quotes').add({
        actor: quote.actor,
        en: quote.en,
        fr: quote.fr,
      });
    }
  }
};

module.exports = seed;





