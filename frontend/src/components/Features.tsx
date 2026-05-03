import { Box, Container, Grid, Typography, Paper } from '@mui/material'
import BoltIcon from '@mui/icons-material/Bolt'
import ShieldIcon from '@mui/icons-material/Shield'
import DevicesIcon from '@mui/icons-material/Devices'

export default function Features() {
  const features = [
    {
      icon: <BoltIcon fontSize="large" sx={{ mb: 2 }} />,
      title: 'Lightning Fast',
      description: 'Our servers process your request in milliseconds, delivering the video instantly.'
    },
    {
      icon: <ShieldIcon fontSize="large" sx={{ mb: 2 }} />,
      title: '100% Secure',
      description: 'We do not store your downloads or track your history. Your privacy is guaranteed.'
    },
    {
      icon: <DevicesIcon fontSize="large" sx={{ mb: 2 }} />,
      title: 'Works Anywhere',
      description: 'Fully compatible with mobile, tablet, and desktop devices. No apps required.'
    }
  ]

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom fontWeight="bold">
        Why use YT-DLP WebUI?
      </Typography>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: '50%', backgroundColor: 'background.default' }}>
                {feature.icon}
              </Paper>
              <Typography variant="h6" component="h3" gutterBottom fontWeight="500">
                {feature.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {feature.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
