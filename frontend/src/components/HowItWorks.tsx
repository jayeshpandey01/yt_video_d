import { Box, Container, Grid, Typography } from '@mui/material'

export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Copy Link',
      description: 'Find the video you want to download and copy its URL.'
    },
    {
      number: '2',
      title: 'Paste Link',
      description: 'Paste the copied link into the input field above.'
    },
    {
      number: '3',
      title: 'Download',
      description: 'Click download and save the video to your device.'
    }
  ]

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom fontWeight="bold">
        How it works
      </Typography>
      <Grid container spacing={4} sx={{ mt: 4, position: 'relative' }}>
        {steps.map((step, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
              <Typography variant="h1" sx={{ color: 'action.disabledBackground', fontWeight: 900, opacity: 0.5, mb: -4, fontSize: '6rem' }}>
                {step.number}
              </Typography>
              <Typography variant="h6" component="h3" gutterBottom fontWeight="500" sx={{ mt: 4 }}>
                {step.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '250px' }}>
                {step.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
