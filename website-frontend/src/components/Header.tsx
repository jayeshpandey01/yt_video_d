import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material'
import { Download } from 'lucide-react'

export default function Header() {
  
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.primary' }}>
            <Download size={28} />
            <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
              YT-SAVE
            </Typography>
          </Box>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
            {['Features', 'How it works', 'FAQ'].map((item) => (
              <Button 
                key={item} 
                onClick={() => scrollTo(item.toLowerCase().replace(/ /g, '-'))}
                sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'none', fontSize: '1rem', '&:hover': { color: 'text.primary' } }}
              >
                {item}
              </Button>
            ))}
          </Box>

          <Button 
            variant="contained" 
            sx={{ 
              borderRadius: 2, 
              bgcolor: 'text.primary', 
              color: 'background.paper', 
              px: 3, 
              textTransform: 'none', 
              fontWeight: 600,
              '&:hover': { bgcolor: 'text.secondary' }
            }}
          >
            Get Started
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
