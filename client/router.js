import Router from 'preact-router';

import App from 'containers/app';
import NotFound from 'containers/not-found';
import Index from 'containers/index';
import Projects from 'containers/projects';

const Page = () => (
  <App>
    <Router>
      <Index path="/"/>
      <Projects path="/projects"/>
      <NotFound default path="/404"/>
    </Router>
  </App>
);

export default Page;
