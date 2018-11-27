const get = (name, schema) => ({
  name: name,
  schema: schema[name],
  values: schema[`${name}_values`],
  settings: schema[`${name}_settings`],
});

/**
 * Создаем структуру полей ввода
 * @param
 * @param {object} schema - схема с разметкой данных о полях
 * @returns {object} объект схемы и значений полей
 */
const makeStructure = (schema) => {
  // {array} structureNames - массив названий схем объектов
  const structureNames = Object.keys(schema).filter(
    (item) => item.indexOf('_') === -1 // в именах не существует '_'
  );

  // Вспомогательная структура
  const structureSkeleton = structureNames.map((item) => get(item, schema));

  // Основная структура
  const structure = structureSkeleton.reduce(
    (sum, item) => [
      ...sum,
      {
        ...item,
        name: `${item.name}0`, // Всегда 0 т.к. инициализация начальная
      },
    ],
    []
  );

  // Инициализация полей ввода
  const values = structure.reduce(
    (sum, item) => ({
      ...sum,
      [item.name]: {
        ...item.values,
      },
    }),
    {}
  );

  console.info('Structure', structure);
  console.info('structureSkeleton', structureSkeleton);
  console.info('values', values);

  return {
    structure,
    structureSkeleton,
    values,
  };
};

const validate = {
  /**
   * Провалидировать все-все значения .valid === true
   * @param {object} values - объект значений
   */
  values: function(values) {
    // console.log('values', values);

    let isValid = true;
    Object.keys(values).map((keyName) => {
      const checkObject = values[keyName];
      // console.log('checkObject', checkObject);

      const checkKeysArray = Object.keys(checkObject);
      const validateArray = checkKeysArray.filter(
        (key) => !checkObject[key].valid
      );
      // console.log('validate', validateArray);
      if (validateArray.length > 0) {
        // console.log('notValid', validateArray.length);
        isValid = false;
      }
    });

    return isValid;
  },
};

// Обработка и подготовка данных перед отправкой на бэк
const prepare = {
  /**
   * I.этап: Формируем объект для отправки на бэк
   * вытаскиваем из объекта для каждого его ключа - .value key
   * @param {object} data - объект со значениями
   * @param {string} objectName - имя объекта из data, откуда вытаскиваем
   */
  getObject: function(data, objectName) {
    // TODO: Хардкод для objectName ... (work0, employee0)
    const dataObject = data[objectName];
    const sendObject = {};

    // Формируем объект для отправки на бэк
    for (const val in dataObject) {
      sendObject[val] = dataObject[val].value;
    }

    return sendObject;
  },
  /**
   * II.этап: Формируем массив для отправки на бэк
   * @param {object} mainObjectId - объект с данными (main_id)
   * @param {string} mainObjectName - ключ, который вытаскиваем из mainObjectId
   * @param {object} data - .state.values лежат все значения полей ввода
   * @param {string} structureName - фильтр для отбора объектов данных
   */
  getArray: (mainObjectId, mainObjectName, data, structureName) =>
    Object.keys(data) // Проходимся по всему объекту
      .filter((arr) => arr.includes(structureName)) // structureName 'rate'
      .map((val) =>
        Object.keys(data[val]) // Объект вытаскиваем из data
          .reduce(
            // Формируем объект с данными
            (sum, item) => ({
              ...sum,
              [item]: data[val][item].value,
            }),
            { [mainObjectName]: mainObjectId[mainObjectName] } // Дописываем ID
          )
      ),

  /**
   * Инициализация данных для дальнейшего обновления данных на бэке
   *
   * @param {object} initObject - начальный объект, к которому добавляем данные
   * @param {string} key - ключ с 'ID'
   * @param {object} data - все - все данные (row.original)
   * @returns
   */
  makeUpdateObject: (initObject, key, data) => {
    return {
      ...initObject,
      [key]: data[key],
    };
  },
};

export { makeStructure, prepare, validate };
