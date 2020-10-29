import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const renderText = ({ input, label, onChange, type, rows, meta: { touched, error, invalid } }) => (
  <TextField
    type={type}
    label={label}
    error={touched && invalid}
    helperText={touched && error}
    rows={rows}
    onChange={onChange}
    margin="normal"
    {...input}
    variant="outlined"
    required
    multiline
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