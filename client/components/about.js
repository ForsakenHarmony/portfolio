const About = ({ resume }) => (
  <section>
    <div>
      <hr/>
      <h1>About Me</h1>
      <hr/>
    </div>
    <div className="card">
      <h3>{resume.basics.name}</h3>
      <a href={'mailto:' + resume.basics.email}>{resume.basics.email}</a>
    </div>
    <h2>Skills</h2>
    {resume.skills.map(s => (
      <Skill skill={s}/>
    ))}
    <h2>Languages</h2>
    <div className="card">
      <ul>
        {resume.languages.map(l => (
          <li>
            <h4>{l.name}</h4>
            <p>
              <small>{l.level}</small>
            </p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const Skill = ({ skill }) => (
  <article className="card">
    <h2>{skill.name}</h2>
    <p>{skill.level}</p>
    <div>
      {skill.keywords.map(k => (
        <span className="badge">{k}</span>
      ))}
    </div>
  </article>
);

export default About;
