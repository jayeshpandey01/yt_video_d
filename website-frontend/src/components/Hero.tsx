import { Alert, Box, Button, Container, TextField, Typography, useTheme, InputAdornment } from '@mui/material'
import { useState } from 'react'
import { useSetAtom } from 'jotai'
import { loadingAtom } from '../hooks/useRPC'
import { useRPC } from '../hooks/useRPC'
import { motion } from 'framer-motion'
import { Link as LinkIcon, Download } from 'lucide-react'

export default function Hero() {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const { client } = useRPC()
  const setLoading = useSetAtom(loadingAtom)
  const theme = useTheme()

  const handleDownload = async () => {
    if (!url) return
    setError('')
    setLoading(true)
    try {
      await client.download({ url, args: '' })
      setUrl('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start download')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ 
      pt: { xs: 10, md: 15 }, 
      pb: { xs: 8, md: 12 },
      background: theme.palette.mode === 'dark' 
        ? 'radial-gradient(circle at 50% -20%, #2a2a2a 0%, #121212 100%)'
        : 'radial-gradient(circle at 50% -20%, #f0f4f8 0%, #ffffff 100%)',
    }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h1" align="center" sx={{ 
            fontWeight: 800, 
            fontSize: { xs: '2.5rem', md: '4.5rem' },
            mb: 2,
            background: 'linear-gradient(135deg, #000 0%, #444 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: theme.palette.mode === 'dark' ? '#fff' : 'transparent',
          }}>
            Download Any Video
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}>
            The fastest way to download videos from your favorite platforms. Simple, fast, and completely free.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ 
            display: 'flex', 
            p: 1, 
            bgcolor: 'background.paper', 
            borderRadius: 4, 
            boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
            border: '1px solid',
            borderColor: 'divider',
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row' }
          }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Paste link here (YouTube, Twitter, Instagram...)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkIcon size={20} color={theme.palette.text.secondary} />
                    </InputAdornment>
                  ),
                  sx: { 
                    borderRadius: 3,
                    '& fieldset': { border: 'none' }
                  }
                }
              }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleDownload}
              disabled={!url}
              startIcon={<Download size={20} />}
              sx={{ 
                px: 4, 
                py: 2,
                borderRadius: 3,
                bgcolor: 'text.primary',
                color: 'background.paper',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1.1rem',
                '&:hover': {
                  bgcolor: 'text.secondary',
                }
              }}
            >
              Download
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}
