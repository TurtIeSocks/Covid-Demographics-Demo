import { createTheme, responsiveFontSizes } from '@mui/material/styles'

export default responsiveFontSizes(
  createTheme({
    palette: {
      primary: { main: '#ED0021' },
      secondary: { main: '#E9B784' },
    },
    components: {
      MuiGrid: {
        defaultProps: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        styleOverrides: {
          root: {
            textAlign: 'center',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          textColorPrimary: {
            color: '#E9B784',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#292c31',
          },
        },
      },
    },
  }),
)
