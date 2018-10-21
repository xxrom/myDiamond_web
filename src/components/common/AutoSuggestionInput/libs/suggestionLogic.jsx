import React from 'react';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { api } from '../../../../libs/';
import { debug } from 'util';

let suggestions = [{ value: 'loading...' }];
const SUGGESTION_LENGTH = 5;

const styles = (theme) => ({
  root: {
    // height: 250,
    flex: '1 2 5em',
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: (node) => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.value, query);
  const parts = parse(suggestion.value, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(self, value) {
  // RegExp Magic ... =)
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp(escapedValue, 'i');

  return (
    self.suggestions
      // Формируем массив совпадений
      .reduce(
        (sum, item) =>
          sum.length < SUGGESTION_LENGTH && regex.test(item.value)
            ? // Сохраняем полностью элемент item, чтобы
              // можно было вытащить оттуда employee_id по имени
              [...sum, item]
            : sum,
        []
      )
  );
}

function getSuggestionValue(item) {
  return item.value;
}

// Fetch suggestion data from server
async function fetchSuggestions(self) {
  let data = [];
  const hardKey = self.props.hardKey;
  let dataSelectorKey = '';

  switch (hardKey) {
    case 'employee_id': {
      dataSelectorKey = 'name';
      data = await api.fetchAllEmployee();
      break;
    }
    case 'article': {
      dataSelectorKey = 'article';
      data = await api.fetchAllArticle();
      break;
    }

    default: {
      console.log('bad self.props.hardKey');
    }
  }

  self.suggestions = data.map((item) => ({
    value: item[dataSelectorKey],
    ...item,
  }));

  // Сохраняем ответ от сервера в this самого компонента
  self.fetchSuggestions = suggestions;
}

export {
  styles,
  getSuggestions,
  getSuggestionValue,
  fetchSuggestions,
  renderSuggestion,
  renderInputComponent,
};
