"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(0, 225, 255)",
      },
      text: {
        primary: "#ffffff",
      },
    },
    typography: {
      fontSize: 16,
    },
    components: {
      MuiInput: {
        styleOverrides: {
          underline: {
            "&:before": {
              borderBottomColor: "rgba(54, 169, 184, 1)", // Цвет нижней полоски при неактивном состоянии
              borderBottomWidth: "2px",
            },
            "&:hover:not(.Mui-disabled):before": {
              borderBottomColor: "rgb(0, 225, 255)", // Цвет нижней полоски при наведении
              borderBottomWidth: "3px",
            },
            "&:after": {
              borderBottomColor: "rgb(0, 225, 255)", // Цвет нижней полоски при активном состоянии
              borderBottomWidth: "3px",
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "rgb(179, 174, 174)", // Цвет текста до нажатия
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: "rgba(0, 153, 173, 1)", // Цвет фона блока, содержащего MenuItem
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            color: "white", // Устанавливаем цвет для стрелки
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            color: "#ffffff", // Цвет Radio Button
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
