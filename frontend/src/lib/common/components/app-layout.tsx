"use client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const theme = createTheme({
  palette: {
    mode: "dark",
    // primary: {
    //   main: blue[300],
    // },
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
      <div className="fixed w-screen h-screen bg-[#101418]"></div>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}
