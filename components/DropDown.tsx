import React, { FC, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';

interface DropdownProps {
  options: string[];
  displayOptions?: string[];
  rounded?: boolean;
  label?: string;
  selectedOption?: string;
  onChange?: (value: string) => void;
}

const Dropdown: FC<DropdownProps> = ({ 
  options, 
  displayOptions = [], 
  rounded, 
  label, 
  onChange, 
  selectedOption 
}) => {
  const [selection, updateSelection] = useState<string>(selectedOption || options[0]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    if (onChange) {
      onChange(value);
    }
    updateSelection(value);
  };

  return (
    <FormControl fullWidth variant="outlined" sx={{ mt: 1, mb: 1 }}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        value={selectedOption || selection}
        onChange={handleChange}
        label={label}
        sx={{
          borderRadius: rounded ? '50px' : '8px',
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={option} value={option}>
            {displayOptions[index] || option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
