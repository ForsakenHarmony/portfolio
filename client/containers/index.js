import { Component } from 'preact';
import { connect } from 'preact-smitty';

import Projects from '../components/projects';
import About from '../components/about';

@connect(state => state)
class Index extends Component {
  state = {
    display: 'projects',
  };

  switchTo = (state) => {
    this.setState({ display: state });
  };

  render({ resume, projects, me }, {}, {}) {
    if (resume === null) {
      return (
        <div className="center card">loading...</div>
      );
    }

    const display = me ? 'about' : 'projects';

    const about = (
      <div className="card no-padding">
        <div className="header">
          <div className="title">
            <h2>About me</h2>
          </div>
        </div>
        <div className="content">
          <p> {resume.basics.summary} </p>
          <ul>
            {resume.skills.map(e => (
              <li>
                <p className="center-text"><strong>{e.name}</strong></p>
                <p className="center-text">
                  (
                  <small>{e.level}</small>
                  )
                </p>
              </li>
            ))}
          </ul>
          <button className="center block" onClick={this.switchTo.bind(null, 'about')}>
            more..
          </button>
        </div>
      </div>
    );

    return (
      <div className="page">
        <div className="sidebar">
          <div className="card">
            <img
              className="center block"
              src={resume.basics.picture}
              alt="ok"
              style={{ borderRadius: '5px' }}/>
          </div>
          <div className="card no-padding">
            <div className="header">
              <div className="title">
                <h1>harmony</h1>
                <h3>( {resume.basics.name} )</h3>
              </div>
            </div>
            <div className="content">
              {resume.basics.profiles.map(p => (
                <p>
                  <a href={p.url}>
                    <i className={`fa-${p.network.toLowerCase()}`}></i>
                    {p.network} - {p.username}
                  </a>
                </p>
              ))}
            </div>
          </div>
          {about}
        </div>
        <div className="main">
          {display === 'projects' && <Projects projects={projects}/>}
          {display === 'about' && <About resume={resume}/>}
        </div>
      </div>
    );
  }
}

export default Index;
