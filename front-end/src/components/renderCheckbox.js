import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

const renderCheckbox = ({ color, name }) => (
  <Checkbox
    color={color}
    name={name}

  />
);

renderCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
};

export default renderCheckbox;