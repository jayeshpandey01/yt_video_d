import { Container, Divider } from '@mui/material'
import { loadingAtom } from '../atoms/ui'
import Downloads from '../components/Downloads'
import HomeActions from '../components/HomeActions'
import LoadingBackdrop from '../components/LoadingBackdrop'
import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import FAQ from '../components/FAQ'
import { useAtomValue } from 'jotai'

export default function Home() {
  const isLoading = useAtomValue(loadingAtom)

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 8 }}>
      <LoadingBackdrop isLoading={isLoading} />
      <Hero />
      <Downloads />
      
      <Divider sx={{ my: 6, opacity: 0.6 }} />
      <div id="features">
        <Features />
      </div>
      
      <Divider sx={{ my: 6, opacity: 0.6 }} />
      <div id="how-it-works">
        <HowItWorks />
      </div>
      
      <Divider sx={{ my: 6, opacity: 0.6 }} />
      <div id="faq">
        <FAQ />
      </div>

      <Box sx={{ py: 4, textAlign: 'center', color: 'text.secondary', borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} {settings.appTitle}. All rights reserved.
        </Typography>
      </Box>

      {/* Kept for floating action buttons and hidden dialogs */}
      <HomeActions />
    </Container>
  )
}
