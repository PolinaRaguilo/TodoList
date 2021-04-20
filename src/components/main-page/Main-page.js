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
    {
      id: 1,
      title: 'fdsf',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
      state: 'todo',
    },
    {
      id: 2,
      title: '231',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.Aenean massa.Aenean massa.Aenean massa.',
      state: 'todo',
    },
  ]);

  return (
    <>
      <Typography className={classes.main__title}>ToDo List</Typography>
      <Container>
        {items.map((item) => {
          return (
            <CardTodo
              key={item.id}
              item={item}
              setItems={setItems}
              items={items}
            />
          );
        })}
      </Container>
      <AddForm addItem={setItems} />
    </>
  );
};

export default MainPage;
