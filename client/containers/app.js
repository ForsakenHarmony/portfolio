import { Component } from 'preact';

import { get } from '../util/fetch';

class App extends Component {
  constructor() {
    super();
    
    get('/assets/resume.json')
      .then(result => result.json())
      .then(resume => this.setState({ resume }));
  }
  
  render({ children }, {}, {}) {
    return (
      <div>
        {children}
      </div>
    );
  }
}

export default App;
