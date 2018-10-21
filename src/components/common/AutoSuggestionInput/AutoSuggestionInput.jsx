import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';

import {
  styles,
  getSuggestions,
  getSuggestionValue,
  fetchSuggestions,
  renderSuggestion,
  renderInputComponent,
} from './libs';

/**
 * Блок с блоками ввода данных
 *
 * @param classes
 * @param label
 * @param value
 * @param onChange
 * @param editable
 * @param keySelector
 */
class AutoSuggestionInputBlock extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    editable: PropTypes.bool.isRequired,
    keySelector: PropTypes.string.isRequired,
  };
  state = {};

  constructor(props) {
    super(props);

    fetchSuggestions(this, props.keySelector);

    const state = {
      single: '',
      popper: '',
      suggestions: [],
    };

    this.state = state;
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(this, value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (_, { newValue }) => {
    this.setState({
      popper: newValue,
    });
  };

  // Get Suggestion after clicking on it (suggestion.value)
  onSuggestionSelected(_, selectParams) {
    const { suggestion } = selectParams;

    console.log('selected = ', suggestion.value);

    // TODO: убрать хардкод вытаскивания элемента employee_id
    // В onChange наверх нужно прокидывать id элемента а не его значение
    this.props.onChange({
      target: {
        value: suggestion[this.props.keySelector],
      },
    });
  }

  // Проверка введенного значения, после увода фокуса (вдруг изменили)
  onBlur = () => {
    // Пользователь может вводить любые значения, не только из бэка
    if (this.props.editable) {
      // TODO: FIX: если пользователь ввел значение нез из списка, то отмечать это визуально
      // Допустим можно оранжевеньким цветом подсвечивать, вместо синего цвета
      return;
    }
    /*
    * Значение инпута, должно быть строго из списка
    * поэтому на блюре идет проверка соответствия
    * inputValue - может меняться только по селекту из списка
    */

    const data = this.fetchSuggestions;
    if (!data) {
      // Если нет данных, то и сравнивать не с чем
      return;
    }

    // Текущее значение в инпуте {String}
    const inputValue = this.state.popper;
    // Значение из schema.values {Number}
    const value = this.props.value;

    const nameArray = data.filter((item) => {
      return item[this.props.keySelector] == value;
    });

    // Если не нашли совпадения или если их несколько, то выходим
    if (nameArray.length !== 1) {
      if (nameArray.length > 1) {
        console.error('id key is not uniq!!!');
      }
      return;
    }

    // Вытаскиваем значение инпута, которое с бэка
    const idName = nameArray[0].value;

    // TODO: здесь можно сделать не принудительный выбор пользователя
    // TODO: не только через список, но и input и далее сравнивать value
    // Если пользователь изменил инпут и вышел из него, то вернуть как было все
    if (idName !== inputValue) {
      console.log(this.fetchSuggestions);

      this.setState({
        popper: idName,
      });
    }
  };

  render() {
    const { classes, label } = this.props;

    const autosuggestProps = {
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      onSuggestionSelected: this.onSuggestionSelected.bind(this),
      renderInputComponent,
      getSuggestionValue,
      renderSuggestion,
    };

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            label: label,
            placeholder: 'Список ...',
            value: this.state.popper,
            onChange: this.handleChange,
            inputRef: (node) => {
              this.popperNode = node;
            },
            InputLabelProps: {
              shrink: true,
            },
            onBlur: this.onBlur,
          }}
          theme={{
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={(options) => (
            <Popper anchorEl={this.popperNode} open={Boolean(options.children)}>
              <Paper
                square
                {...options.containerProps}
                style={{
                  width: this.popperNode ? this.popperNode.clientWidth : null,
                }}
              >
                {options.children}
              </Paper>
            </Popper>
          )}
        />
      </div>
    );
  }
}

const AutoSuggestionInput = withStyles(styles)(AutoSuggestionInputBlock);

export { AutoSuggestionInput };
