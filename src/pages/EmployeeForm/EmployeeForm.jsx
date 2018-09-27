import React, { Component } from 'react';

import { StructureBlock } from '../../components/smart/';
import { SubmitButton } from '../../components/common/';
import { schema } from './libs';
import { api, structure } from '../../libs/';

import './EmployeeForm.css';

class EmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...structure.makeStructure(schema),
    };
  }

  /**
   * Изменение полей блоков
   * @param {string} name - имя блока всего
   * @param {string} key - идентификатор поля
   * @param {object} regexp - валидация поля
   */
  handleOnChange = (name, key, regexp) => (event) => {
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

  /**
   * Добавляем новый блок
   */
  onAddBlock = () => {
    console.log('add rate');
    // Добавляем новый блок к скрытой начальной структуре
    // FIXME: подумать как убрать хардкод индекса ...
    this.state.structureSkeleton.push(this.state.structureSkeleton[1]); // 'rate' - structure

    // Вычисляем параметры нового элемента
    const addedIndex = this.state.structureSkeleton.length - 1;
    const addedItem = this.state.structureSkeleton[addedIndex];
    console.log(addedItem);
    // В структуру закидываем все его данные и генерим имя
    this.state.structure.push({
      ...addedItem,
      name: `${addedItem.name}${addedIndex}`,
    });

    // Вытаскиваем данные из только что добавленного элемента
    const { name, values } = this.state.structure[addedIndex];
    // Добавляем values[schema] для нового блока
    this.setState({
      values: {
        ...this.state.values,
        [name]: values,
      },
    });
  };

  /**
   * Удаление из this.state.structure по имени блока
   *
   * @param findName {string} - имя блока
   */
  handleOnDelete = (findName) => {
    console.log('deleteByName', findName);
    this.state.structure.map(
      ({ name }, index) =>
        name === findName
          ? // Если нашли нужный индекс, то удаляем его сразу
            this.delBlockByIndex(index)
          : ''
    );
  };

  /**
   * Удалить из this.state.structure по номеру в массиве
   * @param index {number} - номер в массиве для удаления
   */
  delBlockByIndex = (index) => {
    console.log(`del by index ${index}`);
    // Удаляем блок и далее перемещаем его в const
    const deletedBlock = this.state.structure.splice(index, 1)[0];
    this.state.structureSkeleton.splice(index, 1);

    const values = { ...this.state.values };
    delete values[deletedBlock.name];

    this.setState({
      values: {
        ...values,
      },
    });
  };

  /**
   * Отправляет данные на сервер
   */
  onSubmit = async () => {
    const { values } = this.state;
    if (!structure.validate.values(values)) {
      console.log('NotValid !!!');
      return;
    }

    // Добавляем нового сотрудника
    const sendEmployeeObj = structure.prepare.getObject(values, 'employee0');
    console.log('sendEmployeeObj', sendEmployeeObj);

    const employeeId = await api.postNewEmployee(sendEmployeeObj);
    console.log(`employeeId`, employeeId);

    // Добавляем для нового сотрудника его ставки
    const sendRateArr = structure.prepare.getArray(
      employeeId,
      'employee_id',
      values,
      'rate'
    );
    console.log('sendRateArr obj', sendRateArr);
    const rateId = await api.postNewRateArray(sendRateArr);
  };

  render() {
    const Diamond = this.state.structure.map(({ name, schema, settings }) => (
      <StructureBlock
        key={name}
        name={name}
        schema={schema}
        settings={settings}
        values={this.state.values[name]}
        handleOnChange={this.handleOnChange}
        handleOnDelete={this.handleOnDelete}
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
