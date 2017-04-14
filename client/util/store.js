'use strict';

import { createStore } from 'smitty';

const initialState = {
  resume  : null,
  projects: [],
};

const store = createStore(initialState);

store.createActions({
  set: 'set',
});

store.handleActions({
  [store.actions.set]: (state, e) => {
    return { ...state, ...e };
  },
});

export default store;
