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
    { id: 1, title: 'fdsf', description: 'hfjdhf' },
    { id: 2, title: '231', description: 'gd' },
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
      <AddForm />
    </>
  );
};

export default MainPage;
