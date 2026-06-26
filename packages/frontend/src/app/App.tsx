import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { HomePage } from '@/pages/home';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={{}}>
        <CssBaseline />
        <HomePage />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
