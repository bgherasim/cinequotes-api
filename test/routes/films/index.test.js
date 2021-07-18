'use strict';

const {test} = require('tap');
const {build, seedDb} = require('../../helper');

test('### GET /films', async (t) => {
  const app = build(t);
  await seedDb();

  const res = await app.inject({
    url: '/films',
  });
  const data = JSON.parse(res.payload);
  t.equal(data.length, 5);
  t.same(data[0], {'id': '13XrZckmCzSHQSqgSjWb', 'title': 'Jerry Maguire'});
});