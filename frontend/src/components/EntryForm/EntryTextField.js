import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

export default function BasicTextFields(props) {
  const { label, placeholder, name, control } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          id="standard-basic"
          label={label}
          variant="standard"
          placeholder={placeholder}
          value={value} // Pass the controlled value
          onChange={onChange} // Bind the onChange handler
          error={!!error} // Show error state if there is an error
          helperText={error ? error.message : ''} // Display error message if available
        />
      )}
    />
  );
}
