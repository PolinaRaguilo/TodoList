import MainPage from './components/main-page';
import ThemeProvider from './styles/ThemeProvider';

const App = () => {
  return (
    <ThemeProvider>
      <MainPage />
    </ThemeProvider>
  );
};
export default App;
