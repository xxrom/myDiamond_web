import React from 'react';

export default (props) => {
  if (props[props.dataName].length === 0) {
    return <h1>Нет данных.</h1>
  } else {
    return {props.children};
  }
}