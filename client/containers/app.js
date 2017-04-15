'use strict';

import { Component } from 'preact';
import { connect } from 'preact-smitty';

import { get } from '../util/fetch';

@connect(() => ({}))
class App extends Component {
  componentWillMount() {
    get('/assets/resume.json')
      .then(result => result.json())
      .then(resume => this.props.actions.set({ resume }));
    get('/assets/projects.json')
      .then(result => result.json())
      .then(projects => this.props.actions.set({ projects }));
  }
  
  render({ children }, {}, {}) {
    return (
      <div className="container">
        {children}
      </div>
    );
  }
}

export default App;
