"use client"

import { IconButton, alpha } from '@mui/material';
import TextField from '@mui/material/TextField';
import styled from '@mui/material/styles/styled';
import { useState } from 'react';

import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const StyledTextField = styled(TextField)({
  // 'minHeight': '48px',
  '& label.Mui-focused': {},
  '& .MuiInput-underline:after': {},
  '& .MuiOutlinedInput-root': {
    'background': '#FFF',
    'borderRadius': '8px',
    'transition': '.6s',
    'color': '#0F1625',
    'fontSize': '14px',
    'fontWeight': '400',
    // 'padding': '0px 4px',

    '& fieldset': {
      borderColor: '#D0D6DD',
    },
    '&:hover fieldset': {
      borderColor: alpha('#D0D6DD', 0.6),
    },
    '&.Mui-focused fieldset': {
      border: '1px solid',
      borderColor: '#D0D6DD',
    },
  },
  '&:placeholder': {
    color: '#A0AEC0',
  },
});

export const StyledTextFieldMobile = styled(TextField)({
  'height': '35px',

  '& label.Mui-focused': {},
  '& .MuiInput-underline:after': {},
  '& .MuiOutlinedInput-root': {
    'background': '#FFF',
    'borderRadius': '8px',
    'transition': '.6s',
    'color': '#384a62',
    'fontSize': '14px',
    'fontWeight': '500',
    'fontFamily': 'Satoshi',

    '& fieldset': {
      borderColor: '#E3E3E3',
    },
    '&:hover fieldset': {
      borderColor: alpha('#F88379', 0.6),
    },
    '&.Mui-focused fieldset': {
      border: '1px solid',
      borderColor: '#F88379',
    },
  },
  '&:placeholder': {
    color: '#8E8E8E',
  },
});

interface MyTextFieldProps {
  id?: string;
  name?: string;
  type?: string;
  label?: string;
  placeholder: string;
  error?: string | any;
  leadingIcon?: React.ReactNode;
  optional?: boolean;
  multiline?: boolean;
  onLeadingClick?: () => void;
  suffixIcon?: React.ReactNode;
  onSuffixIconClick?: () => void;
  [key: string]: any;
}

const MyTextField = ({
  label,
  type = 'text',
  placeholder,
  error = '',
  optional = false,
  multiline = false,
  leadingIcon,
  onLeadingClick,
  suffixIcon,
  onSuffixIconClick,
  ...others
}: MyTextFieldProps) => {
  const isObscured = type === 'password';
  const [obscured, setObscured] = useState<boolean>(true);

  const renderPrefix = () => (
    <IconButton size='small' onClick={onLeadingClick}>
      {leadingIcon}
    </IconButton>
  );

  const renderSuffix = () => (
    <IconButton
      size='small'
      onClick={onSuffixIconClick}
      disabled={!onSuffixIconClick}
    >
      {suffixIcon}
    </IconButton>
  );

  const renderVisibilityIcons = () => (
    <IconButton
      size='small'
      onClick={() => {
        setObscured((prev) => !prev);
      }}
    >
      {obscured ? (
        <VisibilityOffOutlinedIcon fontSize='small' htmlColor='#8E8E8E' />
      ) : (
        <VisibilityOutlinedIcon fontSize='small' htmlColor='#8E8E8E' />
      )}
    </IconButton>
  );

  return (
    <div
      className='w-full'
      style={{
        marginBottom: 0,
      }}
    >
      {label && (
        <h3 className='text-[3.5vw] sm:text-[14px] font-[500] mb-[5px] text-[#0F1625]'>
          <span>{label}</span>{' '}
          {optional && (
            <span className='text-odi-lite text-[12.5px] font-[200]'>
              (optional)
            </span>
          )}
        </h3>
      )}
      <StyledTextField
        placeholder={placeholder}
        error={!!error}
        helperText={error || ''}
        InputProps={{
          startAdornment: leadingIcon ? renderPrefix() : null,
          endAdornment: isObscured
            ? renderVisibilityIcons()
            : suffixIcon // if theres a suffix icon
            ? renderSuffix()
            : null,
        }}
        type={!obscured ? 'text' : type}
        inputProps={others}
        multiline={multiline}
        {...others}
        fullWidth
      />
    </div>
  );
};

export default MyTextField;
