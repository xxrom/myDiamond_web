import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import './AddEmployee.css';

const AddEmployee = ({ name, schema, handleOnChange, values }) => (
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
  </Paper>
);

AddEmployee.propTypes = {
  name: PropTypes.string.isRequired,
  schema: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  handleOnChange: PropTypes.func.isRequired,
};

export default AddEmployee;
