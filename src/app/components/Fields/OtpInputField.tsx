import OtpInput, { InputProps } from "react-otp-input";
import { alpha } from "@mui/material";
import { ReactNode } from "react";

const OtpInputField = ({
  value,
  onChange,
  error,
  ...props
}: {
  value: string;
  onChange: any;
  error?: string | boolean;
  [key: string]: any;
}) => (
  <>
<OtpInput
  renderInput={(inputProps, index) => <input {...inputProps} key={index} />}
  value={value}
  onChange={onChange}
  numInputs={6}
  shouldAutoFocus={true}
  containerStyle={{
    justifyContent: "space-between",
    gap: '12px', // Add spacing between inputs for a cleaner look
  }}
  inputStyle={{
    width: "48px",
    height: "48px",
    background: "#fff", // Lighter background for a softer feel
    border: error
      ? `1px solid ${alpha("#A71F0D", 0.5)}`
      : "1px solid #e3e3e3", // Slightly thicker border for a defined look
    borderRadius: "12px", // Rounded corners
    outline: "none",
    fontWeight: "600",
    fontSize: "20px",
    textAlign: "center", // Center the input value
    transition: "border-color 0.2s ease, box-shadow 0.2s ease", // Smooth transition for hover/focus effects
    padding: "0", // No padding needed since the size is set by width/height
    // boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", 
  }}
  // focusStyle={{
  //   borderColor: "#5CB67F", // Greenish border when focused
  //   boxShadow: "0 4px 8px rgba(92, 182, 127, 0.3)", // Slightly bigger shadow on focus
  // }}
  {...props}
/>


    {error && <small className="text-[11px] text-errorColor">{error}</small>}

    {/* Add this CSS to your main stylesheet or use Tailwind */}
    <style jsx>{`
      input:focus {
        border: 1px solid #ef0000 !important;
      }
    `}</style>
  </>
);

export default OtpInputField;
