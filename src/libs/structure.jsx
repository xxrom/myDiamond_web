const get = (name, schema) => ({
  name: name,
  schema: schema[name],
  values: schema[`${name}_values`],
  settings: schema[`${name}_settings`],
});

export { get };
