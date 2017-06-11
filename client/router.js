'use strict';

import { Component } from 'preact';

import Router from 'preact-router';
import { Provider } from 'preact-smitty';

import store from 'util/store';

import App from 'containers/app';
import NotFound from 'containers/not-found';
import Index from 'containers/index';

class Page extends Component {
  onChange = ({ url }) => {
    store.actions.routeTo(url);
  };
  
  render({}, {}, {}) {
    return (
      <Provider store={store}>
        <App>
          <Router onChange={this.onChange}>
            <Index path="/"/>
            <Index me path="/me"/>
            <NotFound default path="/404"/>
          </Router>
        </App>
      </Provider>
    );
  }
}

export default Page;
