import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { InputsPaperBlock } from '../../../../components/smart';
import { structure, api } from '../../../../libs';

import { schema } from '../../../WorkForm/libs';
import { setDefaultValues } from './../../../../libs/table/setDefaultValues';

const onUpdate = (row) =>
  async function() {
    const { values } = this.state;
    const { work_id, article_id } = row;

    if (!structure.validate.values(values)) {
      console.log('NotValid !!!');
      // Показываем PopUp с ошибкой
      this.setState({
        openValidationMessage: true,
        validateMessageType: 'validationError',
      });
      return;
    }
    console.log('row', row);
    console.log('values', values);
    console.log(`work_id ${work_id}, article_id ${article_id}`);

    // Обновляем данные по артикулу
    const tableArticle = 'article';
    const sendArticleObj = structure.prepare.getObject(
      values,
      `${tableArticle}0`
    );
    console.log('sendArticleObj', sendArticleObj);
    const updateArticle = await api.updateTableData(
      sendArticleObj,
      tableArticle,
      row
    );
    console.log(`updateArticle`, updateArticle);

    // Обновляем данные по работе
    const tableWork = 'work';
    let sendWorkObj = structure.prepare.getObject(values, `${tableWork}0`);
    console.log('sendWorkObj obj', sendWorkObj);

    const updateWork = await api.updateTableData(sendWorkObj, tableWork, row);
    console.log(`updateWork`, updateWork);

    // Показываем popUp об успешном обновлении данных на бэке
    this.setState({
      openValidationMessage: true,
      validateMessageType: 'successfulUpdate',
    });
  };

const onDelete = (row) =>
  async function() {
    const articleId = row.article_id;
    const workId = row.work_id;

    const deleteArticleId = await api.deleteArticleId(articleId);
    console.log('deleteArticleId', deleteArticleId);

    const workAns = await api.selectArticleByWorkId(workId);
    console.log(`workAns`, workAns);

    // Проверяем если еще записи с таким же work_id, если нет, то удаляем этот work_id
    if (workAns.length === 0) {
      console.log(
        `workAns.length === ${
          workAns.length
        } (0) => delete by workId = ${workId}`
      );
      const deletedWorkId = await api.deleteWorkByWorkId(workId);
      console.log(deletedWorkId);
    }

    // Показываем popUp об успешном удалении данных на бэке
    this.setState({
      openValidationMessage: true,
      validateMessageType: 'successfulDelete',
    });
  };

class WorkRow extends Component {
  static propTypes = {
    row: PropTypes.object.isRequired,
    onClick: PropTypes.func,
  };

  render() {
    const { row } = this.props;
    console.log('row => ', row);
    console.log('schema.schema', schema);

    const schemaWithDefaultValues = setDefaultValues(schema, row.original);

    return (
      <InputsPaperBlock
        title="Изменить данные работы"
        schema={schemaWithDefaultValues}
        submitButtonTitle="Обновить"
        deleteButtonTitle="Удалить"
        // TODO: подумать как убрать каждоразовое создание функции onUpdate
        onSubmit={onUpdate(row.original)}
        onDelete={onDelete(row.original)}
        mode="mini"
      />
    );
  }
}

// WorkRow.propTypes = {
//   onClick: PropTypes.func,
// };

export { WorkRow };
