import { Box, Container, Grid, Typography } from '@mui/material'

export default function HowItWorks() {
  const steps = [
    { number: '01', title: 'Copy Link', description: 'Copy the URL of the video you want to download.' },
    { number: '02', title: 'Paste & Click', description: 'Paste the link in the input field and click Download.' },
    { number: '03', title: 'Enjoy', description: 'Your video will be ready for you in seconds.' }
  ]

  return (
    <Box id="how-it-works" sx={{ bgcolor: 'action.hover', py: 12 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" sx={{ fontWeight: 800, mb: 10 }}>
          How It Works
        </Typography>
        <Grid container spacing={6}>
          {steps.map((step, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Box sx={{ position: 'relative', textAlign: { xs: 'center', md: 'left' } }}>
                <Typography variant="h1" sx={{ 
                  fontSize: '8rem', 
                  fontWeight: 900, 
                  color: 'divider', 
                  position: 'absolute', 
                  top: -60, 
                  left: { xs: '50%', md: 0 }, 
                  transform: { xs: 'translateX(-50%)', md: 'none' },
                  zIndex: 0,
                  opacity: 0.5
                }}>
                  {step.number}
                </Typography>
                <Box sx={{ position: 'relative', zIndex: 1, pt: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {step.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
