'use strict';

import { Component } from 'preact';
import { connect } from 'preact-smitty';
import { Link } from 'preact-router';

import { get } from '../util/fetch';

@connect(state => ({ url: state.url }))
class App extends Component {
  componentWillMount() {
    get('/assets/resume.json')
      .then(result => result.json())
      .then(resume => this.props.actions.set({ resume }));
    get('/assets/projects.json')
      .then(result => result.json())
      .then(projects => this.props.actions.set({ projects }));
  }
  
  render({ children, url }, {}, {}) {
    return (
      <div>
        <div className="nav">
          <NavItem url={url} href="/">Projects</NavItem>
          <NavItem url={url} href="/me">About Me</NavItem>
          <NavItem url={url} href="/404">404?</NavItem>
        </div>
        <div className="container">
          {children}
        </div>
      </div>
    );
  }
}

const NavItem = ({ children, href, url }) => (
  <Link class={`nav-item ${href === url && 'active'}`} href={href}>{children}</Link>
);

export default App;
