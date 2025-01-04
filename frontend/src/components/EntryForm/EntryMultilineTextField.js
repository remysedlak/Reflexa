import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form'

export default function MultlineTextFields(props) {
  const {label, placeholder, name, control} = props
  return (   
    <Controller
      name = {name}
      control = {control}
      render = {({
        field: {onChange, value},
        fieldState: {error},
        formState,
 }) => (
  <TextField
  id="standard-multiline-static"
  label="Multiline"
  multiline
  rows={4}
  defaultValue="Default Value"
  variant="standard"
  value={value} // Pass the controlled value
  onChange={onChange} // Bind the onChange handler
/>)
 }
      />
  );
}