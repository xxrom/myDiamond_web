import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

import './Employee.css';
import TextField from '@material-ui/core/TextField';

class Employee extends Component {
  constructor(props) {
    super(props);

    const regexp = {
      name: /^[ ]{0,}[a-zа-яё]+[ ]{1,}[a-zа-яё]+[ ]{0,}$/i,
      number: /^[ ]{0,}[0-9]+[ ]{0,}$/,
      date: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/i,
    };

    console.log(regexp.name);

    this.labels = [
      {
        label: 'Фамилия Имя',
        key: 'name',
        regexp: regexp.name,
        type: 'text',
        defaultValue: '',
      },
      {
        label: 'Тариф-будни',
        key: 'rate_week_day',
        regexp: regexp.number,
        type: 'text',
        defaultValue: '',
      },
      {
        label: 'Тариф-выходной',
        key: 'rate_week_end',
        regexp: regexp.number,
        type: 'text',
        defaultValue: '',
      },
      {
        label: 'Начало тарифа',
        key: 'start_date',
        regexp: regexp.date,
        type: 'date',
        defaultValue: String(new Date().toISOString().slice(0, 10)),
      }, // send to server new Date().toISOString()
      {
        label: 'Конец тарифа',
        key: 'end_date',
        regexp: regexp.date,
        type: 'date',
        defaultValue: String(
          new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            .toISOString()
            .slice(0, 10)
        ),
      },
    ];

    console.log('r1 ', regexp.name.test('name name'));
    console.log('r2 ', regexp.name.test('name 32'));

    this.state = {};
    this.labels.map(
      ({ key, defaultValue }) => (this.state[key] = defaultValue)
    );

    this.handleOnChange = (key) => (event) => {
      this.setState({
        [key]: event.target.value,
      });
    };
  }

  render() {
    console.log(this.state);
    const TextInputs = this.labels.map(
      ({ label, key, regexp, type, defaultValue }) => (
        <TextField
          label={label}
          key={label}
          className="input"
          onChange={this.handleOnChange(key)}
          error={regexp.test(this.state[key]) === false}
          type={type}
          defaultValue={defaultValue}
        />
      )
    );

    return (
      <Paper className="employee-wrapper">
        <h2>Добавить нового работника</h2>
        <div>{TextInputs}</div>
      </Paper>
    );
  }
}

export default Employee;
