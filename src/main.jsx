import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/Global.css";
import "./styles/Forms.css";
import "./styles/Table.css";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
