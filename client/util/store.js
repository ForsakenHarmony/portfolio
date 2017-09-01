import { createStore } from 'smitty';

const initialState = {
  resume  : null,
  projects: [],
};

const store = createStore(initialState);

store.createActions({
  set    : 'set',
  routeTo: 'route-to',
});

store.handleActions({
  [store.actions.set]    : (state, e) => {
    return { ...state, ...e };
  },
  [store.actions.routeTo]: (state, url) => {
    return { ...state, url };
  },
});

export default store;
