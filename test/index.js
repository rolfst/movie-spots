import test from 'ava';
import 'babel-core/register';

import movieSpots from '../src/lib/';

test('movieSpots', (t) => {
  t.is(movieSpots(), true);
});
