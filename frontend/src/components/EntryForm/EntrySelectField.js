import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';

export default function SelectVariants(props) {
  const { label, name, control, moodColors } = props;

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="mood-color-select-label">{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              labelId="mood-color-select-label"
              id="mood-color-select"
              value={value}
              onChange={onChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {moodColors && moodColors.length > 0 ? (
                moodColors.map((color) => (
                  <MenuItem key={color.value} value={color.value}>
                    <span style={{ backgroundColor: color.value, padding: '5px 10px' }}>
                      {color.label}
                    </span>
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">
                  <em>No mood colors available</em>
                </MenuItem>
              )}
            </Select>
          )}
        />
      </FormControl>
    </div>
  );
}
