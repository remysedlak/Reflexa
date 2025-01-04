import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Controller} from 'react-hook-form'

export default function BasicDatePicker(props) {
    const {label, control, name} = props
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
              name = {name}
              control = {control}
              render = {({field: {onChange, value}}) => (<DatePicker label= {label} value={value} // Pass the controlled value
                onChange={onChange} />)}
      />
    </LocalizationProvider>
  );
}
