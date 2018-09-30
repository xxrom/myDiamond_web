import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './WorkForm.css';

import { StructureBlock, handleOnChange } from '../../components/smart';
import { SubmitButton } from '../../components/common';
import { api, structure } from '../../libs/';
import { schema } from './libs/';
import { SnackbarPop } from '../../components/common/';

/**
 * Список полей выводящийся по схеме (schema)
 *
 * @param {string} name - имя блока
 */
class WorkForm extends Component {
  static = {
    // name: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      openValidationMessage: false,
      validateMessageType: '',
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
      ...this.state.values,
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
      ...this.state.values,
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
      this.setState({
        openValidationMessage: true,
        validateMessageType: 'validationError',
      });
      return;
    }

    // Добавляем новую работу
    // FIXME: сотрудник ID нужно выпадающий список Имен сотрудников с их ID
    const sendWorkObject = structure.prepare.getObject(values, 'work0');
    console.log('sendWorkObject', sendWorkObject);

    const workId = await api.postNewWork(sendWorkObject);
    console.log(`workId`, workId);

    // Добавляем для сотрудника его работы
    const sendArticleArr = structure.prepare.getArray(
      workId,
      'work_id',
      values,
      'article'
    );
    console.log('sendArticleArr', sendArticleArr);
    const articleId = await api.postNewArticleArray(sendArticleArr);

    this.setState({
      openValidationMessage: true,
      validateMessageType: 'successfulSending',
    });
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
      <div className="work-from">
        <h3>Добавить новую работу.</h3>
        {Diamond}

        <button className="add-employee-btn" onClick={this.onAddBlock} />

        <SubmitButton
          onSubmit={this.onSubmit}
          disabled={false}
          buttonTitle="Добавить работу"
        />

        <SnackbarPop
          open={this.state.openValidationMessage}
          onClose={() => this.setState({ openValidationMessage: false })}
          messageType={this.state.validateMessageType}
        />
      </div>
    );
  }
}

export { WorkForm };
