import { IconButton, InputAdornment, TextField } from "@mui/material";
import { FC, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface PasswordInputProps {
  id?: string;
  label?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

export const PasswordInput: FC<PasswordInputProps> = ({
  id,
  label,
  value,
  onChange,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <TextField
      label={label}
      variant="outlined"
      id={id}
      value={value}
      onChange={onChange}
      type={isPasswordVisible ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={() => setIsPasswordVisible((prev) => !prev)}>
              {isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
