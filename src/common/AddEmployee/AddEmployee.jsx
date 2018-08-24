import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import './AddEmployee.css';

/**
 * Список полей выводящийся по схеме (schema)
 *
 * @param {string} name - имя блока
 * @param {array} schema - схема всего блока
 * @param {object} values - значения для инпутов и валидация
 * @param {func} handleOnChange - вызов ф по изменению
 * @param {func} handleOnDelete - вызов ф по клику на удалить
 */
const AddEmployee = ({
  name,
  schema,
  handleOnChange,
  handleOnDelete,
  values,
}) => (
  <Paper className="inputs-wrapper">
    {schema.map(({ label, key, regexp }) => (
      <div className="div-input-wrapper" key={`${label}${key}`}>
        <TextField
          label={label}
          className="input"
          onChange={handleOnChange(name, key, regexp)}
          error={!values[key].valid}
          value={values[key].value}
          fullWidth
        />
      </div>
    ))}
    <button className="delete-btn" onClick={handleOnDelete(name)} />
  </Paper>
);

AddEmployee.propTypes = {
  name: PropTypes.string.isRequired,
  schema: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleOnDelete: PropTypes.func.isRequired,
};

export default AddEmployee;
