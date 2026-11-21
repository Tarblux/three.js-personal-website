import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';

const CustomSelect = ({ value, onChange, options }) => (
  <Select
    value={value}
    onChange={e => onChange(e.target.value)}
    input={<InputBase />}
    sx={{
      minWidth: 120,
      fontWeight: 600,
      fontSize: 16,
      background: 'white',
      borderRadius: 2,
      boxShadow: 1,
      '.MuiSelect-select': { display: 'flex', alignItems: 'center', gap: 1 },
      '.MuiOutlinedInput-notchedOutline': { border: 'none' },
      '&:hover': { background: '#f3f4f6' },
    }}
    renderValue={selected => {
      const option = options.find(opt => opt.value === selected);
      return (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 15 }}>
          {option.icon && <img src={option.icon} alt={option.label} style={{ width: 20, height: 20 }} />}
          {option.label}
        </span>
      );
    }}
    MenuProps={{
      PaperProps: {
        style: {
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        },
      },
    }}
  >
    {options.map(opt => (
      <MenuItem key={opt.value} value={opt.value} sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 2 }}>
        {opt.icon && <img src={opt.icon} alt={opt.label} style={{ width: 20, height: 20, marginRight: 8 }} />}
        {opt.label}
      </MenuItem>
    ))}
  </Select>
);

export default CustomSelect; 