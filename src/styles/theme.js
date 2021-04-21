import { createMuiTheme } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';

const palette = {
  text: {
    main: colors.grey[100],
  },
  background: {
    main: colors.grey[900],
    primary: colors.grey[800],
  },
};

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          margin: '0 auto',
          backgroundColor: palette.background.main,
          color: palette.text.main,
          width: '50%',
        },
      },
    },
    MuiInputBase: {
      root: {
        backgroundColor: colors.grey[100],
        marginBottom: 20,
        width: 500,
      },
    },

    MuiButton: {
      root: {
        backgroundColor: colors.grey[100],
        width: 200,
        marginRight: 200,
        '&:hover': {
          backgroundColor: colors.grey[300],
        },
      },
    },
    MuiTypography: {
      root: {},
    },
    MuiCircularProgress: {
      colorPrimary: {
        color: colors.grey[100],
        display: 'block',
        margin: '0 auto',
        marginBottom: 20,
      },
    },
  },
});

export default theme;
