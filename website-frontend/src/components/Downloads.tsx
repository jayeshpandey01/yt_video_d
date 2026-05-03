import { Box, Container, Typography, LinearProgress, Card, IconButton, Stack } from '@mui/material'
import { useRPC } from '../hooks/useRPC'
import { X, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProcessStatus } from '../types'

export default function Downloads() {
  const { downloads, client } = useRPC()

  if (downloads.length === 0) return null

  const toProgressValue = (percentage: string) => {
    const parsed = Number.parseFloat(percentage)
    if (!Number.isFinite(parsed)) return 0
    return Math.max(0, Math.min(100, parsed))
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Active Downloads
      </Typography>
      <Stack spacing={2}>
        <AnimatePresence>
          {downloads.map((dl) => (
            <motion.div
              key={dl.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Card sx={{ p: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Box 
                    component="img" 
                    src={dl.info.thumbnail} 
                    sx={{ width: 80, height: 45, borderRadius: 1, objectFit: 'cover', bgcolor: 'action.hover' }} 
                  />
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography variant="body1" noWrap sx={{ fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {dl.info.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {dl.progress.speed ? `${(dl.progress.speed / 1024 / 1024).toFixed(2)} MB/s` : 'Starting...'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {dl.progress.process_status === ProcessStatus.COMPLETED ? (
                      <CheckCircle color="#10b981" size={20} />
                    ) : dl.progress.process_status === ProcessStatus.ERRORED ? (
                      <AlertCircle color="#ef4444" size={20} />
                    ) : (
                      <Clock color="#3b82f6" size={20} />
                    )}
                    <IconButton size="small" onClick={() => client.kill(dl.id)}>
                      <X size={18} />
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={toProgressValue(dl.progress.percentage)} 
                    sx={{ height: 6, borderRadius: 3, bgcolor: 'action.hover' }}
                  />
                </Box>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </Stack>
    </Container>
  )
}
