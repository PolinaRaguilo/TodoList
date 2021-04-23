import { BrowserRouter, Route } from 'react-router-dom';
import TodoPage from './components/todo-page';

import MainPage from './components/main-page';
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
