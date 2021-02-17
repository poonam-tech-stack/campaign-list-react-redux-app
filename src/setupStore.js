import { init } from '@rematch/core'
import * as models from './models';
import selectPlugin from '@rematch/select'

const store = init({
  models,
  plugins: [selectPlugin()]
});

export default store