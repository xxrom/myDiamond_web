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

    // Скрытая структура сотрудника
    this._structureEmployee = {
      name: 'employee',
      schema: schema.employee,
      schemaValues: schema.employee_values,
    };
    // Скрытая структура рэйта
    this._structureRate = {
      name: 'rate',
      schema: schema.rate,
      schemaValues: schema.rate_values,
    };
    // Скрытая новая структуру =)
    this._structure = [
      this._structureEmployee,
      this._structureRate,
      this._structureRate,
      this._structureRate,
      this._structureRate,
      this._structureRate,
    ];

    // Генерим новую структуру с учетом расположения эелментов
    this.structure = this._structure.map((item, index) => ({
      ...item,
      name: `${item.name}${index}`,
    }));

    // хранилище всех переменных по key = structure.name
    const values = {}; // TODO: попробовать сразу в this.state

    // закидываем ключи в хранилище переменных
    this.structure.forEach((item) => (values[item.name] = item.schemaValues));

    this.state = { values };
  }

  /**
   * Добавляем новый блок
   */
  onAddBlock = () => {
    console.log('add rate');
    // Добавляем новый блок к скрытой начальной структуре
    this._structure.push(this._structureRate);

    // Вычисляем параметры нового элемента
    const addedIndex = this._structure.length - 1;
    const addedItem = this._structure[addedIndex];
    console.log(addedItem);
    // В структуру закидываем все его данные и генерим имя
    this.structure.push({
      ...addedItem,
      name: `${addedItem.name}${addedIndex}`,
    });

    // Вытаскиваем данные из только что добавленного элемента
    const { name, schemaValues } = this.structure[addedIndex];
    // Добавляем schemaValues для нового блока
    this.setState({
      values: {
        ...this.state.values,
        [name]: schemaValues,
      },
    });
  };

  /**
   * Удаления блока
   */
  onDelBlock = () => {
    const lastIndexForDelet = this.structure.length - 1;
    this.delBlockByIndex(lastIndexForDelet);
  };

  /**
   * Удалить из this.structure по номеру в массивае
   * @param index {number} - номер в массиве для удаления
   */
  delBlockByIndex = (index) => {
    console.log(`del by index ${index}`);
    // Удаляем блок и далее перемещаем его в const
    const deletedBlock = this.structure.splice(index, 1)[0];
    this._structure.splice(index, 1);

    const values = { ...this.state.values };
    delete values[deletedBlock.name];

    this.setState({
      values: {
        ...values,
      },
    });
  };

  /**
   * Удаление из this.structure по имени блока
   *
   * @param findName {string} - имя блока
   */
  onDelByName = (findName) => (e) =>
    this.structure.map(
      ({ name }, index) =>
        name === findName
          ? // Если нашли нужный индекс, то удаляем его сразу
            this.delBlockByIndex(index)
          : ''
    );

  render() {
    const Diamond = this.structure.map(({ name, schema }) => (
      <AddEmployee
        key={name}
        name={name}
        schema={schema}
        values={this.state.values[name]}
        handleOnChange={this.handleOnChange}
        handleOnDelete={this.onDelByName}
      />
    ));

    return (
      <div>
        <h3 className="title">Добавить нового сотрудника</h3>
        {Diamond}
        <button onClick={this.onAddBlock}>Добавить rate</button>
        <button onClick={this.onDelBlock}>Удалить последний rate</button>
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
