import { ThemeProvider } from '../contexts/ThemeContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack >
        <Stack.Screen name='login' />
        <Stack.Screen name='cadastro' />
      </Stack>
    </ThemeProvider>
  );
};
