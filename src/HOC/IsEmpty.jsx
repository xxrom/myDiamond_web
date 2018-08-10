import React from 'react';

export default ({ dataName, ...props }) => (WrapperComponent) =>
  props[dataName].length === 0 ? (
    <h1>Нет данных.</h1>
  ) : (
    <WrapperComponent {...props} />
  );
