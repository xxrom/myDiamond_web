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
  let innerIndex = 0; // внутренний счетчик
  const structure = structureSkeleton.reduce((sum, item, index) => {
    if (
      sum[sum.length - 1] &&
      sum[sum.length - 1].name.indexOf(item.name) === -1
    ) {
      // Сбрасываем счетчик если новое имя начинается
      innerIndex = 0;
    }

    return [
      ...sum,
      {
        ...item,
        name: `${item.name}${innerIndex++}`,
      },
    ];
  }, []);

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
