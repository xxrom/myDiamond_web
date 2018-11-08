import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import Chip from '@material-ui/core/Chip';

import Avatar from '@material-ui/core/Avatar';

import ReportProblem from '@material-ui/icons/ReportProblem';

class SnackbarPop extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    messageType: PropTypes.string.isRequired,
  };

  /**
   * Вернет нужный стикер (фишку)
   * @param {string} messageType - тип сообщения
   */
  getChip(messageType) {
    let labelText = 'Undefined text ???';
    let colorType = 'primary';
    switch (messageType) {
      // Ошибка ввода валидации данных
      case 'validationError':
        labelText = 'Проверьте введённые данные';
        colorType = 'secondary';
        break;

      case 'successfulSending':
        labelText = 'Данные успешно загружены';
        break;

      case 'successfulUpdate':
        labelText = 'Данные успешно обновлены';
        break;
    }

    return (
      <Chip
        label={labelText}
        color={colorType}
        avatar={
          <Avatar>
            <ReportProblem />
          </Avatar>
        }
      />
    );
  }

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.props.open}
        onClose={this.props.onClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={this.getChip(this.props.messageType)}
      />
    );
  }
}

export { SnackbarPop };
