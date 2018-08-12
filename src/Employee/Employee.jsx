import React, { Component } from 'react';
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

    this.state = {
      disableBtn: true,
    };
    this.labels.map(
      ({ key, defaultValue, regexp }, index) =>
        (this.state[key] = {
          value: defaultValue,
          valid: regexp.test(defaultValue),
        })
    );

    this.handleOnChange = (key, regexp) => (event) => {
      this.setState(
        {
          [key]: {
            value: event.target.value,
            valid: regexp.test(event.target.value),
          },
        },
        this.checkInputs
      );
    };
    this.sendData = this.sendData.bind(this);
  }

  checkInputs() {
    let valid = 0;
    this.labels.forEach(({ key }) => (!this.state[key].valid ? valid++ : ''));
    console.log(`valid = ${valid}`);
    this.setState({
      disableBtn: !!valid,
    });
  }

  sendData() {
    console.log('click');
    console.log('send');
    const employeeData = {};
    this.labels.forEach(
      ({ key }) => (employeeData[key] = this.state[key].value)
    );
    console.log(employeeData);

    // const url = 'https://my-diamond-postgresql.herokuapp.com/api/employee'
    const url = 'http://localhost:8080/api/employee';
    fetch('http://localhost:8080/api/employee', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(employeeData),
    })
      .then((res) => {
        console.log(`POST: ${url} // res status = ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('employee Table data', data);
        const { employee_id } = data.data;
        const rateData = {
          ...employeeData,
          employee_id,
        };

        fetch('http://localhost:8080/api/rate', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          body: JSON.stringify(rateData),
        })
          .then((res) => {
            console.log(`POST: ${url} // res status = ${res.status}`);
            return res.json();
          })
          .then((data) => {
            console.log('rate Table data', data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  render() {
    console.log(this.state);
    const TextInputs = this.labels.map(({ label, key, regexp, type }) => (
      <div className="div-input-wrapper" key={key}>
        <TextField
          label={label}
          className="input"
          onChange={this.handleOnChange(key, regexp)}
          error={this.state[key].valid === false}
          type={type}
          value={this.state[key].value}
          fullWidth
        />
      </div>
    ));

    return (
      <Paper className="employee-wrapper">
        <h2 className="employee-text">Добавить нового сотрудника</h2>
        <Paper className="inputs-wrapper">{TextInputs}</Paper>

        <button
          className={`add-btn ${this.state.disableBtn ? '' : 'valid'}`}
          disabled={this.state.disableBtn}
          onClick={this.sendData}
        >
          Добавить сотрудника
        </button>
      </Paper>
    );
  }
}

export default Employee;
