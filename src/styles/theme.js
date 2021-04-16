import { createMuiTheme } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';

const palette = {
  text: {
    main: colors.grey[100],
  },
  background: {
    main: '#674d91',
    primary: colors.grey[800],
  },
};

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          margin: 0,
          backgroundColor: palette.background.main,
          color: palette.text.main,
        },
      },
    },
    MuiTypography: {
      root: {},
    },
  },
});

export default theme;
