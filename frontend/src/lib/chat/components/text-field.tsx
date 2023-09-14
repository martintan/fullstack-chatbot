import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from "@mui/material";

type TextFieldProps = MuiTextFieldProps & {
  onSubmit?: () => void;
};

export const TextField = (props: TextFieldProps) => (
  <MuiTextField
    variant="outlined"
    placeholder="Say hello!"
    sx={{ borderRadius: 2, width: "100%" }}
    size="small"
    {...props}
  />
);
