import { ThemeProvider as Provider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';

const ThemeProvider = ({ children }) => (
  <Provider theme={theme}>
    <CssBaseline />
    {children}
  </Provider>
);

export default ThemeProvider;
