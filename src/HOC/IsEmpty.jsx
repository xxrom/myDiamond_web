import React from 'react';

export default ({ dataName, ...props }) => (WrappedCoponent) => {
  if (props[dataName].length === 0) {
    return <h1>Нет данных.</h1>;
  } else {
    return <WrappedCoponent {...props} />;
  }
};
