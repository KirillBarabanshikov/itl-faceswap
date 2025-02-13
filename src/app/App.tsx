import './styles/main.scss';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';

import { Router } from './router/Router.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

export const App = () => {
  useEffect(() => {
    navigator.mediaDevices
      ?.enumerateDevices()
      .then((devices) => console.log(devices));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};
