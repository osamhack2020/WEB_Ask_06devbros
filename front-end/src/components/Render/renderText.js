import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const renderText = ({ input, value, label, type, meta: { touched, error, invalid } }) => (
  <TextField
    type={type}
    label={label}
    value={value}
    error={touched && invalid}
    helperText={touched && error}
    margin="normal"
    {...input}
    variant="outlined"
    required
    fullWidth
    autoComplete="current-text"
  />
);

renderText.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object,
};

export default renderText;