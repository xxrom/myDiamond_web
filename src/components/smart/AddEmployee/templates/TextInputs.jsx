import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const TextInputs = ({ labels = [], handleOnChange, values }) => (
  <Paper className="inputs-wrapper">
    {labels.map(({ label, key, regexp }) => (
      <div className="div-input-wrapper" key={key}>
        <TextField
          label={label}
          className="input"
          onChange={handleOnChange(key, regexp, type)}
          error={values[key].valid === false}
          value={values[key].value}
          fullWidth
        />
      </div>
    ))}
  </Paper>
);

TextInputs.propTypes = {
  labels: PropTypes.array.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default TextInputs;
