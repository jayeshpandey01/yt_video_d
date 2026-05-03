import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material'
import Header from './components/Header'
import Hero from './components/Hero'
import Downloads from './components/Downloads'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import FAQ from './components/FAQ'
import { Typography, Container } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: { main: '#000000' },
    background: { default: '#ffffff' },
    text: { primary: '#000000', secondary: '#666666' }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Hero />
          <Downloads />
          <Features />
          <HowItWorks />
          <FAQ />
        </Box>
        <Box sx={{ py: 6, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
          <Container>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} YT-SAVE. Built for performance and privacy.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
