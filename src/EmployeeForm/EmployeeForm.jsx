import React, { Component } from 'react';

import AddEmployee from '../common/AddEmployee';
import { schema } from './libs';
import { SubmitButton } from './templates';

import './EmployeeForm.css';

class EmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = () => {
      console.log('OnSubmit');
    };

    this.handleOnChange = (name, key, regexp) => (event) => {
      console.log('handleOnChange parent 1', event.target.value);
      console.log(`${name} ${key}`);
      this.setState({
        values: {
          ...this.state.values,
          [name]: {
            ...this.state.values[name],
            [key]: {
              value: event.target.value,
              valid: regexp.test(event.target.value),
            },
          },
        },
      });
    };

    const structureEmployee = {
      name: 'employee',
      schema: schema.employee,
      schemaValues: schema.employee_values,
    };
    const structureRate = {
      name: 'rate',
      schema: schema.rate,
      schemaValues: schema.rate_values,
    };
    const structure = [
      structureEmployee,
      structureRate,
      structureRate,
      structureRate,
      structureRate,
      structureRate,
    ];

    // генерим новую структуру с учетом расположения эелментов
    this.structure = structure.map((item, index) => ({
      ...item,
      name: `${name}${index}`,
    }));

    // хранилище всех переменных по key = structure.name
    const values = {}; // TODO: попробовать сразу в this.state

    // закидываем ключи в хранилище переменных
    this.structure.forEach((item) => (values[item.name] = item.schemaValues));

    this.state = { values };
  }

  render() {
    console.log(this.structure);
    console.log(this.state);
    const Diamond = this.structure.map(({ name, schema }) => (
      <AddEmployee
        key={name}
        name={name}
        schema={schema}
        values={this.state.values[name]}
        handleOnChange={this.handleOnChange}
      />
    ));

    return (
      <div>
        <h3 className="title">Добавить нового сотрудника</h3>
        {Diamond}
        <SubmitButton
          onSubmit={this.onSubmit}
          disabled={true}
          buttonTitle="Добавить сотрудника"
        />
      </div>
    );
  }
}
// <AddEmployee
//   labels={labels.rate_label}
//   handleOnChange={this.handleOnChange}
// />

export default EmployeeForm;
