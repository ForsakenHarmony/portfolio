import Router from 'preact-router';

import Index from 'containers/index';
import NotFound from 'containers/not-found';
import App from 'containers/app';

const Page = () => (
  <App>
    <Router>
      <Index path="/"/>
      <NotFound default path="/404"/>
    </Router>
  </App>
);

export default Page;
