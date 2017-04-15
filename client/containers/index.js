'use strict';

import { Component } from 'preact';
import Router from 'preact-router';
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
  
  render({ resume, projects }, { display }, {}) {
    if (resume === null) {
      return (
        <div className="center card">loading...</div>
      );
    }
    
    const about = (
      <div className="card">
        <h2>About me</h2>
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
    );
    
    return (
      <div className="page">
        <div className="sidebar">
          <div className="card">
            <img className="center block" src={resume.basics.picture} alt="ok"/>
          </div>
          <div className="card">
            <h1>harmony</h1>
            <h3>( {resume.basics.name} )</h3>
            <hr/>
            {resume.basics.profiles.map(p => (
              <p>
                <a href={p.url}>
                  <i className={`fa-${p.network.toLowerCase()}`}></i>
                  {p.username}
                </a>
              </p>
            ))}
          </div>
          {about}
        </div>
        <div className="main">
          <div>
            <button onClick={this.switchTo.bind(null, 'projects')}>Projects</button>
            <button onClick={this.switchTo.bind(null, 'about')}>About Me</button>
            <a className="button" href="/404" onClick={Router.route.bind(null, 404)}>404?</a>
          </div>
          {display === 'projects' && <Projects projects={projects}/>}
          {display === 'about' && <About resume={resume}/>}
        </div>
      </div>
    );
  }
}

export default Index;
