import { Container, makeStyles, Typography } from '@material-ui/core';
import { useState } from 'react';
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

  const [items, setItems] = useState([
    { id: 0, title: 'Reading', description: 'Read one book' },
  ]);

  return (
    <>
      <Typography className={classes.main__title}>ToDo List</Typography>
      <Container>
        {items.map((item) => {
          return <CardTodo key={item.id} todo={item} />;
        })}
      </Container>
      <AddForm addItem={setItems} />
    </>
  );
};

export default MainPage;
