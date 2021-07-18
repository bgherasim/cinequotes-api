'use strict';

const {test} = require('tap');
const {build, seedDb} = require('../../../../../helper');

test('### GET /films/:filmId/quotes/:quoteId', async (t) => {
  const app = build(t);
  await seedDb();

  const quotesRes = await app.inject({
    url: '/films/13XrZckmCzSHQSqgSjWb/quotes',
  });

  const res = await app.inject({
    url: `/films/13XrZckmCzSHQSqgSjWb/quotes/${JSON.parse(
        quotesRes.payload)[0].id}`,
  });
  const data = JSON.parse(res.payload);
  t.ok(data.actor);
  t.same(data, {'actor': 'Renee Zelwegger', 'quote': 'You had me at hello.'});
});

test('### GET /films/:filmId/quotes/:quoteId 404', async (t) => {
  const app = build(t);
  await seedDb();

  const res = await app.inject({
    url: `/films/13XrZckmCzSHQSqgSjWb/quotes/invalidId`,
  });
  t.equal(res.statusCode, 404);
});