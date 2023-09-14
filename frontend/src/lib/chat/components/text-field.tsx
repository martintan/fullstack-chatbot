import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from "@mui/material";

type TextFieldProps = MuiTextFieldProps;

export function TextField(props: TextFieldProps) {
  return (
    <MuiTextField
      variant="outlined"
      placeholder="Say hello!"
      sx={{ bgcolor: "white", borderRadius: 2, width: "100%" }}
      {...props}
    />
  );
}
