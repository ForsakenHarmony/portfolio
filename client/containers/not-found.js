const NotFound = () => (
  <div className="center center-text">
    <h1>404</h1>
    <div className="card no-padding" style={{ display: 'inline-flex' }}>
      <img src="https://http.cat/404" alt="404"/>
    </div>
    <a href="/" className="card">Go Back</a>
  </div>
);

export default NotFound;
