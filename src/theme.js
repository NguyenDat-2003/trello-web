import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { teal, deepOrange, cyan, orange } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    headerBarheight: '58px',
    boardBarheight: '60px'
  },
  colorSchemes: {
    // light: {
    //   palette: {
    //     primary: teal,
    //     secondary: deepOrange
    //   }
    // },
    // dark: {
    //   palette: {
    //     primary: cyan,
    //     secondary: orange
    //   }
    // }
  },
  components: {
    // Name of the component
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            height: '6px'
          },
          '*::-webkit-scrollbar-thumb ': {
            backgroundColor: '#bdc3c7',
            borderRadius: '6px'
          },
          '*::-webkit-scrollbar-thumb:hover ': {
            backgroundColor: '#ecf0f1',
            borderRadius: '6px'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: '90px',
          textTransform: 'none'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.9rem'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '0.9rem'
        }
      }
    }
  }
})

export default theme
