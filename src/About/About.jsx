import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class About extends Component {
  render() {
    return (
      <div>
        <div>About</div>
        <Link to="/"><button>To Main</button></Link>
      </div>);
  }
}

export default About;