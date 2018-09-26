import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './WorkForm.css';

import { StructureBlock, handleOnChange } from '../../components/smart';
import { SubmitButton } from '../../components/common';
import { api, structure } from '../../libs/';
import { schema } from './libs/';

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
    function getObject(data, objectName) {
      // TODO: Хардкод для objectName ... (work0, employee0)
      const dataObject = data[objectName];
      const sendObject = {};

      console.log('dataObject', dataObject);
      // Формируем объект Employee для отправки на бэк
      for (const val in dataObject) {
        console.log('values ', val);
        sendObject[val] = dataObject[val].value;
      }

      return sendObject;
    }

    function getArticleArray(workId, data) {
      // проходимся по всему объекту
      return Object.keys(data)
        .filter((rate) => rate.includes('article')) // фильтруем объект по 'rate'
        .map((val) =>
          Object.keys(data[val]) // объект вытаскиваем из data
            .reduce(
              // Формируем объект с данными
              (sum, item) => ({
                ...sum,
                [item]: data[val][item].value,
              }),
              { work_id: workId }
            )
        );
    }

    // Добавляем новую работу
    // FIXME: сотрудник ID нужно выпадающий список Имен сотрудников с их ID
    const sendWorkObject = getObject(this.state.values, 'work0');
    console.log('sendWorkObject', sendWorkObject);

    const workId = await api.postNewWork(sendWorkObject);
    console.log(`workId`, workId);

    // Добавляем для сотрудника его работы
    const sendArticleArr = getArticleArray(workId.work_id, this.state.values);
    console.log('sendArticleArr', sendArticleArr);
    const articleId = await api.postNewArticleArray(sendArticleArr);
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

        <SubmitButton
          onSubmit={this.onSubmit}
          disabled={false}
          buttonTitle="Добавить работу"
        />
        <button className="add-employee-btn" onClick={this.onAddBlock} />
      </div>
    );
  }
}

export { WorkForm };
