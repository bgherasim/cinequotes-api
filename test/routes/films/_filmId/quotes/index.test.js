'use strict';

const {test} = require('tap');
const {promisify} = require('util');
const {build, seedDb} = require('../../../../helper');

const firestore = require('../../../../../store/firestore');

const pause = promisify((a, f) => setTimeout(f, a));

test('### GET /films/:filmId/quotes', async (t) => {
  const app = build(t);
  await seedDb();

  const res = await app.inject({
    url: '/films/13XrZckmCzSHQSqgSjWb/quotes',
  });
  const data = JSON.parse(res.payload);

  t.same(data[0].quote, 'You had me at hello.');
});

test('### POST /films/:filmId/quotes', async (t) => {
  const app = build(t);
  await seedDb();

  const res = await app.inject({
    method: 'POST',
    url: '/films/13XrZckmCzSHQSqgSjWb/quotes',
    payload: {
      'actor': 'New Actor',
      'quote': 'Say hello to my little friend.',
    },
  });
  const data = JSON.parse(res.payload);

  t.ok(data.id);
});

test('### translate worker should kick in within 5 seconds', async (t) => {
  const app = build(t);
  await seedDb();

  const res = await app.inject({
    method: 'POST',
    url: '/films/13XrZckmCzSHQSqgSjWb/quotes',
    payload: {
      'actor': 'New Actor',
      'quote': 'Say hello to my little friend.',
    },
  });
  const data = JSON.parse(res.payload);

  await pause(5000); /// wait 5 seconds

  const quoteDoc = await firestore.collection('films').
      doc('13XrZckmCzSHQSqgSjWb').
      collection('quotes').
      doc(data.id).
      get();

  t.ok(quoteDoc.data().en);

  t.ok(quoteDoc.data().fr);
});