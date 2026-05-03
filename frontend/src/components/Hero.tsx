import { Box, Button, Container, TextField, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { loadingAtom } from '../atoms/ui'
import { useRPC } from '../hooks/useRPC'
import { useToast } from '../hooks/toast'
import { settingsState } from '../atoms/settings'

export default function Hero() {
  const [url, setUrl] = useState('')
  const { client } = useRPC()
  const { pushMessage } = useToast()
  const setIsLoading = useSetAtom(loadingAtom)
  const settings = useAtomValue(settingsState)
  const theme = useTheme()

  const handleDownload = () => {
    if (!url) return
    
    // We initiate a simple download with default settings
    setIsLoading(true)
    client.download({
      url: url,
      args: '',
      pathOverride: '',
      renameTo: '',
      playlist: false,
    })
    
    pushMessage(`Requested ${url}`, 'info')
    setUrl('')
    
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Container maxWidth="md" sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.75rem' } }}>
        Download Videos
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 6, fontWeight: 400 }}>
        Fast, free, and high-quality video downloads using yt-dlp.
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        width: '100%', 
        maxWidth: '800px', 
        gap: 1, 
        flexDirection: { xs: 'column', sm: 'row' },
        backgroundColor: theme.palette.mode === 'dark' ? '#1E1E1E' : '#FFFFFF',
        borderRadius: '8px',
        p: 1,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}>
        <TextField
          fullWidth
          placeholder="Paste video URL here..."
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none',
              },
            },
          }}
        />
        <Button 
          variant="contained" 
          size="large"
          onClick={handleDownload}
          disabled={!url}
          sx={{ 
            px: 4, 
            py: { xs: 2, sm: 0 },
            backgroundColor: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
            color: theme.palette.mode === 'dark' ? '#000000' : '#FFFFFF',
            fontWeight: 'bold',
            borderRadius: '6px',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? '#E0E0E0' : '#333333',
            }
          }}
        >
          Download
        </Button>
      </Box>
    </Container>
  )
}
