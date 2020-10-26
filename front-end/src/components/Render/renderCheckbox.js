import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

const renderCheckbox = ({ id, color, label, type, meta: { touched, error, invalid }  }) => (
  <Checkbox
    id={id}
    color={color}
    type={type}
    label={label}
    error={touched && invalid}
    helperText={touched && error}
  />
);

renderCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  meta: PropTypes.object,
};

export default renderCheckbox;