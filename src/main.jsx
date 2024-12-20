import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import StompTest from './StompTest.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StompTest />
    </StrictMode>,
)
