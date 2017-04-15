'use strict';

const Projects = ({ projects }) => (
  <section>
    <div>
      <hr/>
      <h1>Projects</h1>
      <hr/>
    </div>
    {projects.map(p => (
      <Project project={p}/>
    ))}
  </section>
);

const Project = ({ project }) => (
  <article className="card">
    <h2>{project.name}</h2>
    <p>{project.description}</p>
    <a href={project.link}><i className="fa-github"></i>Github</a>
  </article>
);

export default Projects;
