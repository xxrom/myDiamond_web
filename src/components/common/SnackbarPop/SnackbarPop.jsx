import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import Chip from '@material-ui/core/Chip';

import Avatar from '@material-ui/core/Avatar';

import ReportProblem from '@material-ui/icons/ReportProblem';
import Done from '@material-ui/icons/Done';

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
    switch (messageType) {
      // Ошибка ввода валидации данных
      case 'validationError':
        return (
          <Chip
            label="Проверьте введённые данные"
            color="secondary"
            avatar={
              <Avatar>
                <ReportProblem />
              </Avatar>
            }
          />
        );
      case 'successfulSending':
        return (
          <Chip
            label="Данные успешно загружены"
            color="primary"
            avatar={
              <Avatar>
                <Done />
              </Avatar>
            }
          />
        );
    }
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
