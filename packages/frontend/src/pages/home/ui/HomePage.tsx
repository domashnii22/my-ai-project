import { Container, Typography } from '@mui/material';

export function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Семейные траты
      </Typography>
    </Container>
  );
}
