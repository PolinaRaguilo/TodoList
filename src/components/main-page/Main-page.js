import { Container, makeStyles, Typography } from '@material-ui/core';
import AddForm from '../add-form/add-form';
import CardTodo from '../card-todo/Card-todo';

const useStyles = makeStyles(() => ({
  main__title: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 20,
  },
}));

const MainPage = () => {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.main__title}>ToDo List</Typography>
      <Container>
        <CardTodo />
        <CardTodo />
        <CardTodo />
        <CardTodo />
      </Container>
      <AddForm />
    </>
  );
};

export default MainPage;
