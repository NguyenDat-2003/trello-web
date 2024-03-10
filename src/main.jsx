import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

// --- Cấu hình react-toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// --- Cấu hình Mui Dialog
import { ConfirmProvider } from 'material-ui-confirm'

import theme from '~/theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CssVarsProvider theme={theme}>
    <ConfirmProvider
      defaultOptions={{
        dialogProps: { maxWidth: 'xs' },
        confirmationButtonProps: { variant: 'outlined' },
        cancellationButtonProps: { color: 'error' }
      }}
    >
      <CssBaseline />
      <App />
      <ToastContainer autoClose={2000} theme="colored" />
    </ConfirmProvider>
  </CssVarsProvider>
)
