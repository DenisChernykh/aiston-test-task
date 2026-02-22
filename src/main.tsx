import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App.tsx'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@/app/styles/index.css'
import { AppChakraProvider } from '@/app/providers/chakra-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppChakraProvider>
      <App />
    </AppChakraProvider>
  </StrictMode>,
)
