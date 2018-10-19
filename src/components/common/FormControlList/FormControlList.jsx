import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

/*
 * Пример применения компонента
<FormControlList
  label={label}
  value={this.state.ageNumber || ''}
  onChange={handleOnChange}
  list={this.state[`list_${key}`] || []}
  name="ageNumber"
  key={key}
/>
*/
class FormControlList extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  };

  render() {
    const { label, key, onChange, list, name, value } = this.props;
    console.log('props', this.props);
    return (
      <div className="div-input-wrapper" key={`${label}${key}`}>
        <FormControl className="div-input-wrapper" key={`${label}${key}`}>
          <InputLabel shrink htmlFor="age-label-placeholder">
            List: {label}
          </InputLabel>
          <Select
            value={value}
            onChange={onChange}
            input={<Input name="ageNumber" id="age-label-placeholder" />}
            displayEmpty
            name={name}
          >
            <MenuItem value={10}>
              {list
                ? list.length
                : `list_${key} // TODO: show data from backend`}
            </MenuItem>
            <MenuItem value="undefined">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>TwentyTwenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}

export { FormControlList };
