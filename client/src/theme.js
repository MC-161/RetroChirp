// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#E6FBFF",
    100: "#FF0000",
    200: "#99EEFD",
    300: "#66E6FC",
    400: "#EF5350",
    500: "#F44336",   // Original Red
    600: "#D32F2F",   // Darker Red
    700: "#C62828",   // Even Darker Red
    800: "#B71C1C",   // Deep Red
    900: "#A41616",   // Very Deep Red
    1000: "#8B0000",  // Almost Black Red
  },
  
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              dark: colorTokens.primary[500],
              main: colorTokens.primary[100],
              light: colorTokens.primary[800],
              second: colorTokens.grey[0] 
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[1000],
              alt: colorTokens.grey[800],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[100],
              light: colorTokens.primary[50],
              second: colorTokens.grey[1000] 
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Kongtext", "sans-serif"].join(","),
      fontSize: 10,
      h1: {
        fontFamily: ["Kongtext", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Kongtext", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Kongtext", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Kongtext", "sans-serif"].join(","),
        fontSize: 14,
      },
      h5: {
        fontFamily: ["Kongtext", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Kongtext", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

