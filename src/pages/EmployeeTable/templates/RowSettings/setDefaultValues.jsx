import { validate } from '../../../../libs';

/**
 * Проставляем дефолтные значения из defaultValuesObj
 *
 * @param {object} schema - схема, в копию которой присваиваются дефолтные значения
 * @param {object} defaultValues - объект, из которого нужно вытащить значения для новой схемы
 * @returns {object} newSchema - новый объект
 */
const setDefaultValues = (schema, defaultObject) => {
  const newSchema = { ...schema };
  Object.keys(newSchema)
    // Фильтруем все key у схемы, которые содержат '_values'
    .filter((key) => key.indexOf('_values') !== -1)
    // У каждого такого key пробегаемся внутри по его key и правим value
    .forEach((key) => {
      Object.keys(newSchema[key])
        // Фильтруем: если есть дефолтное значение и оно есть в схеме
        .filter(
          (innerKey) => defaultObject[innerKey] && newSchema[key][innerKey]
        )
        // Каждому присваиваем новое значение
        .forEach((innerKey) => {
          // Если defaultObject[innerKey] - дата, то берем только первые 10 символов
          if (validate.isValidDate(defaultObject[innerKey])) {
            newSchema[key][innerKey].value = defaultObject[innerKey].slice(
              0,
              10
            );
          } else {
            newSchema[key][innerKey].value = defaultObject[innerKey];
          }
        });
    });

  return newSchema;
};

export { setDefaultValues };
