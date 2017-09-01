const Projects = ({ projects }) => (
  <section>
    <div>
      <h1>Projects</h1>
    </div>
    {projects.map(p => (
      <Project project={p}/>
    ))}
  </section>
);

const Project = ({ project }) => (
  <article className="card no-padding">
    <div className="header">
      <div className="title">
        <h2>{project.name}</h2>
      </div>
      <a href={project.link} className="action">
        <i className="fa-github"></i>
      </a>
    </div>
    <div className="content">
      <p>{project.description}</p>
      <div>
        {project.tags.map(t => (
          <span className="badge">{t}</span>
        ))}
      </div>
    </div>
  </article>
);

export default Projects;
