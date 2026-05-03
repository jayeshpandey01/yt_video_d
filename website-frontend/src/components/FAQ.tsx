import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material'
import { ChevronDown } from 'lucide-react'

export default function FAQ() {
  const faqs = [
    { question: 'Is this service really free?', answer: 'Yes, our downloader is 100% free to use. No subscriptions, no hidden fees.' },
    { question: 'What video formats are supported?', answer: 'We support MP4, MKV, WEBM, and many other formats depending on the source platform.' },
    { question: 'Is there a limit on the number of downloads?', answer: 'No, you can download as many videos as you like without any restrictions.' },
    { question: 'Can I use it on my phone?', answer: 'Absolutely! Our website is fully responsive and works perfectly on mobile devices.' }
  ]

  return (
    <Container id="faq" maxWidth="md" sx={{ py: 12 }}>
      <Typography variant="h3" align="center" sx={{ fontWeight: 800, mb: 8 }}>
        Common Questions
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {faqs.map((faq, index) => (
          <Accordion key={index} elevation={0} sx={{ 
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '16px !important',
            '&:before': { display: 'none' },
            overflow: 'hidden'
          }}>
            <AccordionSummary expandIcon={<ChevronDown />} sx={{ p: 3, fontWeight: 600, fontSize: '1.1rem' }}>
              {faq.question}
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pb: 3, color: 'text.secondary' }}>
              {faq.answer}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  )
}
