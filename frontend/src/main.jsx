// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './AuthContext.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MenteeProvider } from './MenteeContext.jsx'
const defaultTheme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
    <MenteeProvider>
      <AuthProvider>
        
        <App />
       
      </AuthProvider>
    </MenteeProvider>
    </ThemeProvider>

  </React.StrictMode>,
)
