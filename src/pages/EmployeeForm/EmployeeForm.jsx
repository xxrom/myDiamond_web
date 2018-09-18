import React, { Component } from 'react';

import { AddEmployee } from '../../components/smart/';
import { SubmitButton } from '../../components/common/';
import { schema } from './libs';

import './EmployeeForm.css';

class EmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = () => {
      console.log('OnSubmit');
    };

    /**
     * Изменение полей блоков
     * @param {string} name - имя блока всего
     * @param {string} key - идентификатор поля
     * @param {object} regexp - валидация поля
     */
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

    const getStructure = (name, schema) => ({
      name: name,
      schema: schema[name],
      values: schema[`${name}_values`],
      settings: schema[`${name}_settings`],
    });

    // Скрытые структуры
    this._structureEmployee = getStructure('employee', schema);
    this._structureRate = getStructure('rate', schema);

    // TODO: в случае с датами доработать цепочку дат друг за другом
    // Общая Скрытая новая структура =)
    this._structure = [this._structureEmployee, this._structureRate];

    // Генерим публичную новую структуру с учетом расположения элементов
    this.structure = this._structure.map((item, index) => ({
      ...item,
      name: `${item.name}${index}`,
    }));

    // хранилище всех переменных по key = structure.name
    const values = {}; // TODO: попробовать сразу в this.state

    // закидываем ключи в хранилище переменных
    this.structure.forEach((item) => (values[item.name] = item.values));

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
    const { name, values } = this.structure[addedIndex];
    // Добавляем values[schema] для нового блока
    this.setState({
      values: {
        ...this.state.values,
        [name]: values,
      },
    });
  };

  /**
   * Удаления блока
   */
  onDelBlock = () => {
    const lastIndexForDelete = this.structure.length - 1;
    this.delBlockByIndex(lastIndexForDelete);
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
  onDelByName = (findName) => {
    console.log('deleteByName', findName);
    this.structure.map(
      ({ name }, index) =>
        name === findName
          ? // Если нашли нужный индекс, то удаляем его сразу
            this.delBlockByIndex(index)
          : ''
    );
  };

  render() {
    const Diamond = this.structure.map(({ name, schema, settings }) => (
      <AddEmployee
        key={name}
        name={name}
        schema={schema}
        settings={settings}
        values={this.state.values[name]}
        handleOnChange={this.handleOnChange}
        handleOnDelete={this.onDelByName}
      />
    ));

    return (
      <div className="employee-from">
        <h3 className="title">Добавить нового сотрудника</h3>

        {Diamond}

        <SubmitButton
          onSubmit={this.onSubmit}
          disabled={false}
          buttonTitle="Добавить сотрудника"
        />
        <button className="add-employee-btn" onClick={this.onAddBlock} />
      </div>
    );
  }
}

export { EmployeeForm };
