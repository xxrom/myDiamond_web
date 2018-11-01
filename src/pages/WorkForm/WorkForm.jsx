import React, { Component } from 'react';

import './WorkForm.css';

import { InputsPaperBlock } from '../../components/smart';
import { schema } from './libs/';
import { api, structure } from '../../libs/';

/**
 * Список полей выводящийся по схеме (schema)
 *
 * @param {string} name - имя блока
 */
class WorkForm extends Component {
  /**
   * Отправляет данные на сервер
   */
  onSubmit = async function() {
    const { values } = this.state;
    if (!structure.validate.values(values)) {
      console.log('NotValid !!!', values);
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
    return (
      <InputsPaperBlock
        title="Добавить новую работу."
        schema={schema}
        submitButtonTitle="Добавить работу"
        onSubmit={this.onSubmit}
      />
    );
  }
}

export { WorkForm };
