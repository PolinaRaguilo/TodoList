import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import Tabs from '../components/tabs';
import TodoPage from '../components/todo-page';

const useStyles = makeStyles(() => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '460px 1fr',
  },
}));

const TodoLayout = (props) => {
  const classes = useStyles();
  const className = `${classes.root} ${props.className || ''}`;

  return (
    <Box className={className}>
      <Tabs />
      <TodoPage />
    </Box>
  );
};

export default TodoLayout;
