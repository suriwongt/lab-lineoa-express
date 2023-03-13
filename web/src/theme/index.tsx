import { ReactNode, useMemo } from "react";
// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider, Theme, TypographyVariantsOptions } from '@mui/material/styles';


type ThemeCustomizationProps = {
    children: ReactNode;
};

export default function ThemeCustomization({ children }: ThemeCustomizationProps) {

    const themeOptions: ThemeOptions = useMemo(
        () => ({
          breakpoints: {
            values: {
              xs: 0,
              sm: 768,
              md: 1024,
              lg: 1266,
              xl: 1440
            }
          },
          mixins: {
            toolbar: {
              minHeight: 60,
              paddingTop: 8,
              paddingBottom: 8
            }
          },
           palette: {
            primary: {
              main: '#0052cc',
            },
            secondary: {
              main: '#edf2ff',
            },
          },
          typography:{
            fontFamily:'Prompt'
          }
        }),
        []
      );
    const themes: Theme = createTheme(themeOptions);
 

    return <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes}>
            {children}
        </ThemeProvider>
    </StyledEngineProvider>
}

