/**
 * Изменение полей блоков
 * @param {string} name - имя блока всего
 * @param {string} key - идентификатор поля
 * @param {object} regexp - валидация поля
 * @param {string} type - тип поля
 */
const innerHandleOnChange = (name, key, regexp, type) => (event) => {
  console.log('innerHandleOnChange', name, key, event.target.value, type);
  let keyObject = {
    value: event.target.value,
    valid: regexp.test(event.target.value),
  };

  console.log('keyObject', keyObject);
  this.setState({
    values: {
      ...this.state.values,
      [name]: {
        ...this.state.values[name],
        [key]: keyObject,
      },
    },
  });
};

export { innerHandleOnChange };
