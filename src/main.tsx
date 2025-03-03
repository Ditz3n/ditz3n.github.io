import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './context/LanguageContext.tsx'
import TailwindIndicator from './components/debug/TailwindIndicator.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TailwindIndicator />
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
