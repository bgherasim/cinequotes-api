'use strict';

const {test} = require('tap');
const {build} = require('../../helper');

test('### GET /films', async (t) => {
  const app = build(t);

  const res = await app.inject({
    url: '/films',
  });
  t.ok(JSON.parse(res.payload).length);
  // t.same(JSON.parse(res.payload), {root: true});
});