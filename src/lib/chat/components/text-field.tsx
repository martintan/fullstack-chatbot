import { TextField as MuiTextField } from "@mui/material";

export function TextField() {
  return (
    <MuiTextField
      variant="outlined"
      placeholder="Say hello!"
      sx={{ bgcolor: "white", borderRadius: 2, width: "100%" }}
    />
  );
}
