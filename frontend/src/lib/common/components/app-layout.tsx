"use client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: blue[300],
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: ``,
    },
  },
});

const queryClient = new QueryClient();

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="absolute w-screen h-screen bg-indigo-900/75"></div>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}
