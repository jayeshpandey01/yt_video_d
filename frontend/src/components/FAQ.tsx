import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function FAQ() {
  const faqs = [
    {
      question: 'Is this service free?',
      answer: 'Yes, completely free. You can download as many videos as you want.'
    },
    {
      question: 'Do I need to install an app?',
      answer: 'No, it works entirely in your web browser without any installations.'
    },
    {
      question: 'Can I download private videos?',
      answer: 'Currently, we only support downloading public videos depending on the authentication settings configured on the server.'
    }
  ]

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom fontWeight="bold" sx={{ mb: 6 }}>
        Frequently Asked Questions
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {faqs.map((faq, index) => (
          <Accordion key={index} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', '&:before': { display: 'none' }, borderRadius: '8px !important' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontWeight: 500, p: 2 }}>
              {faq.question}
            </AccordionSummary>
            <AccordionDetails sx={{ color: 'text.secondary', px: 2, pb: 2 }}>
              {faq.answer}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  )
}
