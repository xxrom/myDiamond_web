/**
 * Изменение полей блоков
 * @param {string} name - имя блока всего
 * @param {string} key - идентификатор поля
 * @param {object} regexp - валидация поля
 * @param {string} type - тип поля
 */
function handleOnChange(name, key, regexp, type) {
  return (event) => {
    let keyObject = {
      value: event.target.value,
      valid: regexp.test(event.target.value),
    };

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
}
export { handleOnChange };
