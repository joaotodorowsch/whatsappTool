import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Card from './components/Card.jsx'
import CsvUploader from './components/CsvUploader.jsx'
import ConfigBtn from './components/ConfigBtn.jsx'
import Settings from './components/Settings.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='container2'>
    <Settings></Settings>
    </div>
  </StrictMode>,
)
