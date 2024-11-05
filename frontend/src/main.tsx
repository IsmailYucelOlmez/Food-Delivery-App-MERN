import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Auth0ProviderNavigate from './auth/Auth0ProviderNavigate.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'sonner'

const queryClient=new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false,
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Auth0ProviderNavigate>
        <App />
        <Toaster visibleToasts={1} position="top-right" richColors />
      </Auth0ProviderNavigate>
    </QueryClientProvider>
  </BrowserRouter>
)
