import { BrowserRouter, Route } from 'react-router-dom';
import MainPage from './components/main-page/Main-page';
import TodoPage from './components/todo-page/Todo-page';
import ThemeProvider from './styles/ThemeProvider';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Route exact path="/" component={MainPage} />
        <Route path="/todos/:id" component={TodoPage} />
      </ThemeProvider>
    </BrowserRouter>
  );
};
export default App;
