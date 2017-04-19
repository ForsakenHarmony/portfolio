'use strict';

import Router from 'preact-router';
import { Provider } from 'preact-smitty';

import store from 'util/store';

import App from 'containers/app';
import NotFound from 'containers/not-found';
import Index from 'containers/index';

const Page = () => (
  <Provider store={store}>
    <App>
      <Router>
        <Index path="/"/>
        <Index me path="/me"/>
        <NotFound default path="/404"/>
      </Router>
    </App>
  </Provider>
);

export default Page;
