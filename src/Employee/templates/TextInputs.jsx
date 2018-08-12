import React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const TextInputs = ({ labels, handleOnChange, state }) => (
  <Paper className="inputs-wrapper">
    {labels.map(({ label, key, regexp, type }) => (
      <div className="div-input-wrapper" key={key}>
        <TextField
          label={label}
          className="input"
          onChange={handleOnChange(key, regexp)}
          error={state[key].valid === false}
          type={type}
          value={state[key].value}
          fullWidth
        />
      </div>
    ))}
  </Paper>
);

export default TextInputs;
