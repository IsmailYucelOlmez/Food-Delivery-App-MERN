import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Auth0ProviderNavigate from './auth/Auth0ProviderNavigate.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Auth0ProviderNavigate>
      <App />
    </Auth0ProviderNavigate>
  </BrowserRouter>
)
