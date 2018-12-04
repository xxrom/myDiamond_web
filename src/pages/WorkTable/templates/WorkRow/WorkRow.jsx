import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { InputsPaperBlock } from '../../../../components/smart';
import { structure, api } from '../../../../libs';

import { schema } from '../../../WorkForm/libs';
import { setDefaultValues } from './../../../../libs/table/setDefaultValues';

const onUpdate = (row) =>
  async function() {
    const { values } = this.state;
    if (!structure.validate.values(values)) {
      console.log('NotValid !!!');
      // Показываем PopUp с ошибкой
      this.setState({
        openValidationMessage: true,
        validateMessageType: 'validationError',
      });
      return;
    }
    console.log('values', values);

    // Обновляем данные сотрудника
    // const sendEmployeeObj = structure.prepare.getObject(values, 'employee0');
    // console.log('sendEmployeeObj', sendEmployeeObj);
    // const updateEmployee = await api.updateTableData(
    //   sendEmployeeObj,
    //   'employee',
    //   row
    // );
    // console.log(`updateEmployee`, updateEmployee);

    // Добавляем у данного сотрудника его ставки
    // let sendRateObj = structure.prepare.getObject(values, 'rate0');
    // console.log('sendRateArr obj', sendRateObj);

    // sendRateObj = {
    //   ...sendRateObj,
    //   employee_id: row['employee_id'],
    // };

    // const updateRate = await api.updateTableData(sendRateObj, 'rate', row);
    // console.log(`updateRate`, updateRate);

    // Показываем popUp об успешном обновлении данных на бэке
    this.setState({
      openValidationMessage: true,
      validateMessageType: 'successfulUpdate',
    });
  };

const onDelete = (row) =>
  async function() {
    const original = row._original;
    console.log('onDelete', row);
    console.log('onDelete', original);

    const articleId = row.article_id;
    const workId = row.work_id;
    console.log('articleId', articleId);
    console.log('workId', workId);

    const deleteArticleId = await api.deleteArticleId(articleId);
    console.log('deleteArticleId', deleteArticleId);
    console.log('this.');

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

    // Показываем popUp об успешном обновлении данных на бэке
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
    console.log('row', row);
    console.log('schema.schema', schema);

    const schemaWithDefaultValues = setDefaultValues(schema, row.original);

    return (
      <InputsPaperBlock
        title="Изменить данные работы"
        schema={schemaWithDefaultValues}
        submitButtonTitle="Обновить"
        deleteButtonTitle="Удалить"
        // TODO: подумать как убрать каждоразовое создание функции onUpdate
        onSubmit={onUpdate(row.row)}
        onDelete={onDelete(row.row)}
        mode="mini"
      />
    );
  }
}

// WorkRow.propTypes = {
//   onClick: PropTypes.func,
// };

export { WorkRow };
