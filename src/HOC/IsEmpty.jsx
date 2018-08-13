import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './isEmpty.css';

export default ({ dataName, ...props }) => (WrapperComponent) =>
  props[dataName].length === 0 ? (
    <div className="wrapper">
      <CircularProgress />
    </div>
  ) : (
    <WrapperComponent {...props} />
  );
