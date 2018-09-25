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
  console.log('structureName', structureNames);

  // Вспомогательная структура
  const structureSkeleton = structureNames.map((item) => get(item, schema));

  console.log('structureSkeleton', structureSkeleton);

  // Основная структура
  const structure = structureSkeleton.map((item, index) => ({
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

  console.log('Structure', structure);
  console.log('structureSkeleton', structureSkeleton);
  console.log('values', values);

  return {
    structure,
    structureSkeleton,
    values,
  };
};

export { makeStructure };
