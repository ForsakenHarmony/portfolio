'use strict';

import { Component } from 'preact';
import { connect } from 'preact-smitty';

@connect(state => state)
class Index extends Component {
  render({ resume, projects }, {}, {}) {
    if (resume === null) {
      return (
        <div className="center card">loading...</div>
      );
    }
    
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
          <div className="card">
            <h2>About me</h2>
            <p> {resume.basics.summary} </p>
            <ul>
              {resume.skills.map(e => (
                <li>{e.name}</li>
              ))}
            </ul>
            <button className="center block">more..</button>
          </div>
        </div>
        <div className="main">
          <div>
            <hr/>
            <h1>Projects</h1>
            <hr/>
          </div>
          {projects.map(p => (
            <div className="card">
              <h2>{p.name}</h2>
              <p>{p.description}</p>
              <a href={p.link}><i className="fa-github"></i>Github</a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Index;
