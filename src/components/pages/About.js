import React from 'react';

const About = props => {
  return (
    <div>
      <h3>{props.match.params.id}</h3>
      <h4 className="display-4 text-danger">About Contact Manager</h4>
      <p className="lead">Simple App to manage Contacts</p>
      <p className="text-secondary">Version 0.0.12</p>
    </div>
  );
};
export default About;
