import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Temp extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <button>To</button>
        </Link>
      </div>
    );
  }
}

export default Temp;
