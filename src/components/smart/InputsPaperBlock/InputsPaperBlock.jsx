import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './InputsPaperBlock.css';

import { StructureBlock } from '../';
import { SubmitButton, SnackbarPop } from '../../common';
import { structure } from '../../../libs/';

/**
 * Форма списка полей (по схеме schema)
 *
 * @param {string} title - заглавие данного блока
 * @param {string} submitButtonTitle - название кнопки
 * @param {object} schema - схема всего всего блока, самая важная часть
 */
class InputsPaperBlock extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    schema: PropTypes.object.isRequired,
    submitButtonTitle: PropTypes.string.isRequired,
    deleteButtonTitle: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    mode: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.onSubmit = props.onSubmit.bind(this);
    if (typeof props.onDelete === 'function') {
      this.onDelete = props.onDelete.bind(this);
    }

    this.state = {
      openValidationMessage: false,
      validateMessageType: '',
      ...structure.makeStructure(props.schema),
    };
  }

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
   * Изменение полей блоков
   * @param {string} name - имя блока всего
   * @param {string} key - идентификатор поля
   * @param {object} regexp - валидация поля
   * @param {string} type - тип поля
   */
  handleOnChange = (name, key, regexp, type) => (event) => {
    let keyObject = {
      value: event.target.value,
      valid: regexp.test(event.target.value),
    };

    this.setState({
      values: {
        ...this.state.values,
        [name]: {
          ...this.state.values[name],
          [key]: keyObject,
        },
      },
    });
  };

  // Закрыть SnakbarPop
  onCloseSnackbarPop = () => this.setState({ openValidationMessage: false });

  render() {
    const Inputs = this.state.structure.map(({ name, schema, settings }) => (
      <StructureBlock
        key={name + 'test'}
        name={name}
        schema={schema}
        settings={settings}
        values={this.state.values[name]}
        onChange={this.handleOnChange}
        onDelete={this.handleOnDelete}
      />
    ));

    const submitButton = (
      <SubmitButton
        onSubmit={this.onSubmit}
        disabled={false}
        buttonTitle={this.props.submitButtonTitle}
      />
    );

    let deleteButton = null;
    if (typeof this.props.onDelete === 'function') {
      deleteButton = (
        <SubmitButton
          onSubmit={this.onDelete}
          disabled={false}
          buttonTitle={this.props.deleteButtonTitle}
          style={{ marginLeft: '10px' }}
          buttonType="delete"
        />
      );
    }

    return (
      <div className={`inputs-from ${this.props.mode}`}>
        <h3 className="inputs-from__title">{this.props.title}</h3>
        {Inputs}

        <button className="add-employee-btn" onClick={this.onAddBlock} />

        {submitButton}
        {deleteButton}

        <SnackbarPop
          open={this.state.openValidationMessage}
          onClose={this.onCloseSnackbarPop}
          messageType={this.state.validateMessageType}
        />
      </div>
    );
  }
}

export { InputsPaperBlock };
