"use client";

import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  alpha,
} from "@mui/material";
import styled from "@mui/material/styles/styled";
import React from "react";

const StyledFormControl = styled(FormControl)({
  width: "100%",
  marginBottom: 0,
});

const StyledSelect = styled(Select)({
  background: "#FFF",
  borderRadius: "8px",
  transition: ".6s",
  color: "#A0AEC0",
  fontSize: "16px",
  fontWeight: "400",
  fontFamily: "Cabinet Grotesk",
  padding: "8px 12px",
  lineHeight: "1",
  "& fieldset": {
    borderColor: "#D0D6DD",
  },
  "&:hover fieldset": {
    borderColor: alpha("#D0D6DD", 0.6),
  },
  "&.Mui-focused fieldset": {
    border: "1px solid",
    borderColor: "#D0D6DD",
  },
  "& .MuiSelect-select": {
    padding: "3px",
  },
  "& .MuiSelect-icon": {
    color: "#8E8E8E",
  },
  "&:placeholder": {
    color: "#A0AEC0",
    lineHeight: "1",
  },
});

interface MySelectProps {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  options: { value: string | number; label: string }[];
  optional?: boolean;
  [key: string]: any;
}

const MySelect = ({
  id,
  name,
  label,
  placeholder = "Select an option",
  error = "",
  optional = false,
  options,
  ...others
}: MySelectProps) => {
  return (
    <div style={{ width: "100%", marginBottom: 0 }}>
      {label && (
        <h3 className="text-[3.5vw] sm:text-[14px] font-[500] mb-[5px] text-[#0F1625]">
          <span>{label}</span>{" "}
          {optional && (
            <span className="text-odi-lite text-[12.5px] font-[200]">
              (optional)
            </span>
          )}
        </h3>
      )}
      <StyledFormControl error={!!error} variant="outlined">
        <StyledSelect
          id={id}
          name={name}
          displayEmpty
          defaultValue=""
          {...others}
        >
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </StyledSelect>
        {error && <FormHelperText>{error}</FormHelperText>}
      </StyledFormControl>
    </div>
  );
};

export default MySelect;
