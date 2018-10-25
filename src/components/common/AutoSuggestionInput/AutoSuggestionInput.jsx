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
      // Текущее значение инпута
      popper: '',
      // Значение popper из значений с бэка выбрано или нет?
      isSelectedFromList: true,
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
    /*
    * Значение инпута, должно быть строго из списка (кроме this.props.editable)
    * поэтому на блюре идет проверка соответствия
    * inputValue - может меняться только по селекту из списка
    */

    if (!this.fetchSuggestions) {
      // Если нет данных, то и сравнивать не с чем
      return;
    }

    // Текущее значение в инпуте {String}
    const inputValue = this.state.popper;
    // Значение из props, которое из schema.values {Number}
    const propsValue = this.props.value;

    // Ищем все совпадения из данных с бэка
    let comparedResult = this.fetchSuggestions.filter(
      (item) => item[this.props.keySelector] === propsValue
    );

    // Если не нашли совпадения или если их несколько, то выходим
    if (comparedResult.length !== 1) {
      if (comparedResult.length > 1) {
        console.error('id key is not uniq!!!');
      } else {
        comparedResult = [{}];
      }
    }

    // Вытаскиваем значение инпута, которое с бэка профильтровали ранее
    const comparedValue = comparedResult[0].value || '';

    // Объект со стандартными значениями
    let newState = {
      inputBackgroundColor: '',
    };

    // Если пользователь изменил инпут и вышел из него, то вернуть как было все
    if (comparedValue !== inputValue) {
      // Пользователь может вводить любые значения, не только из бэка
      if (this.props.editable) {
        // Пользователь может менять значение на любое =>
        // нужно фильтровать уже не по propsValue а по inputValue !
        let comparedResultWithInputValue = this.fetchSuggestions.filter(
          (item) => item[this.props.keySelector] === inputValue
        );

        // Если совпадений не нашли => это абсолютно новое значение!
        if (comparedResultWithInputValue.length === 0) {
          newState = {
            ...newState,
            // Инпут не из листа => отмечаем это рамкой
            inputBackgroundColor: 'rgba(0,0,255,0.05)',
          };
        }

        // Пускаем новое значение value наверх, так как editable === true
        this.props.onChange({
          target: {
            value: inputValue,
          },
        });
      } else {
        // Если у поля editable === false =>
        // поле может иметь значения только из списка с бэка (this.fetchSuggestions)
        newState = {
          ...newState,
          popper: comparedValue,
        };
      }
    }

    this.setState({
      ...newState,
    });
  };

  render() {
    const { classes, label } = this.props;

    const autosuggestProps = {
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      onSuggestionSelected: this.onSuggestionSelected.bind(this),
      style: { color: 'red' },
      renderInputComponent,
      getSuggestionValue,
      renderSuggestion,
    };

    // Окраска инпута в зависимости от введенных данных
    let inputStyle = { backgroundColor: this.state.inputBackgroundColor };

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
            // Если значение инпута не из списка => отмечаем это рамочкой
            style: inputStyle,
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
