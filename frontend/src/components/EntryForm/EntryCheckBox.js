import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Controller } from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Checkboxes(props) {
  const { label, control, name } = props;
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={value} // Use checked instead of value for controlled component
                onChange={onChange}
              />
            }
            label={label} // Pass the label text here
          />
        )}
      />
    </div>
  );
}
