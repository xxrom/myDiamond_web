import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <div>
        <div>Main</div>
        <Link to="/about"><button>To About</button></Link>
      </div>
    );
  }
}

export default Main;