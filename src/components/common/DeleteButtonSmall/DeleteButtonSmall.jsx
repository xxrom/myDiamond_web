import React from 'react';
import PropTypes from 'prop-types';

import './DeleteButtonSmall.css';

const DeleteButtonSmall = ({ onClick }) => (
  <button className="delete-btn" onClick={onClick} />
);

DeleteButtonSmall.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export { DeleteButtonSmall };
