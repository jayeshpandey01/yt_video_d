import { Box, Container, Grid, Typography, Card } from '@mui/material'
import { Zap, Shield, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Features() {
  const features = [
    {
      icon: <Zap size={32} color="#f59e0b" />,
      title: 'Ultra Fast',
      description: 'High-speed processing and multi-threaded downloads for maximum efficiency.'
    },
    {
      icon: <Shield size={32} color="#10b981" />,
      title: 'Secure & Private',
      description: 'We respect your privacy. No logs, no tracking, and no data storage.'
    },
    {
      icon: <Globe size={32} color="#3b82f6" />,
      title: 'Universal Support',
      description: 'Supports YouTube, Twitter, Instagram, TikTok, and 1000+ other sites.'
    }
  ]

  return (
    <Container id="features" sx={{ py: 12 }}>
      <Typography variant="h3" align="center" sx={{ fontWeight: 800, mb: 8 }}>
        Why Choose Us?
      </Typography>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card sx={{ 
                p: 4, 
                height: '100%', 
                borderRadius: 5, 
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                textAlign: 'center'
              }}>
                <Box sx={{ mb: 3, display: 'inline-flex', p: 2, bgcolor: 'action.hover', borderRadius: '50%' }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
