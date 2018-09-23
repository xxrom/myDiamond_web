const get = (name, schema) => ({
  name: name,
  schema: schema[name],
  values: schema[`${name}_values`],
  settings: schema[`${name}_settings`],
});

/**
 * Создаем структуру полей ввода
 * @param {array} structureNames - массив названий схем объектов
 * @param {object} schema - схема с разметкой данных о полях
 * @returns {object} объект схемы и значений полей
 */
const makeStructure = (structureNames, schema) => {
  console.log('structureName', structureNames);
  // Вспомогательная структура
  const _structure = structureNames.map((item) => get(item, schema));

  console.log('_structure', _structure);

  // Основная структура
  const structure = _structure.map((item, index) => ({
    ...item,
    name: `${item.name}${index}`,
  }));

  // Инициализация полей ввода
  const values = structure.reduce(
    (sum, item) => ({
      ...sum,
      [item.name]: item.values,
    }),
    {}
  );

  console.log('Structure', structure, 'values', values);

  return {
    structure,
    values,
  };
};

export { makeStructure };
