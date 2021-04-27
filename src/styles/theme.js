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
          backgroundColor: palette.background.main,
          color: palette.text.main,
          maxWidth: 1400,
          margin: '0px auto',
        },
      },
    },
    MuiInputBase: {
      root: {
        backgroundColor: colors.grey[100],
        marginBottom: 20,
      },
    },

    MuiButton: {
      root: {
        backgroundColor: colors.grey[100],
        width: 200,
        '&:hover': {
          backgroundColor: colors.grey[300],
        },
      },
    },
    MuiTypography: {
      root: {},
    },
    MuiSelect: {
      select: {
        paddingLeft: 20,
      },
    },
    MuiList: {
      root: {
        width: 200,
      },
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
