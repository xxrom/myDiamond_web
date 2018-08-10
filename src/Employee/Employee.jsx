import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Employee extends Component {
  render() {
    return (
      <div>
        <div>Employee</div>
        <Link to="/">
          <button>To Main</button>
        </Link>
      </div>
    );
  }
}

export default Employee;
