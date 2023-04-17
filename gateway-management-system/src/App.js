import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import MyComponent from './components/MyComponent';
import Navbar from './components/Navbar';
import AppRouter from './AppRouter';

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <AppRouter />

    </ThemeProvider>
    
  );
}

export default App;