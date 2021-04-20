import {
  Container,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import AddForm from '../add-form/add-form';
import CardTodo from '../card-todo/Card-todo';

const useStyles = makeStyles(() => ({
  main__title: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 20,
    marginRight: 100,
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  selectState: {
    width: 200,
    height: 40,
    marginRight: 45,
  },
}));

const MainPage = () => {
  const classes = useStyles();

  const [currentState, setCurrentState] = useState('All');

  const [items, setItems] = useState([
    { id: 0, title: 'Reading', description: 'Read one book', state: 'todo' },
    {
      id: 1,
      title: 'Reading1',
      description: 'Read one book2',
      state: 'in-progress',
    },
    {
      id: 2,
      title: 'Reading2',
      description: 'Read one book1',
      state: 'in-progress',
    },
  ]);

  const stateValues = [
    { value: 'All', text: 'All' },
    { value: 'todo', text: 'ToDo' },
    { value: 'in-progress', text: 'In progress' },
    { value: 'done', text: 'Done' },
  ];

  const handleChange = (event) => {
    setCurrentState(event.target.value);
  };

  return (
    <>
      <Container className={classes.wrapper}>
        <Typography className={classes.main__title}>ToDo List</Typography>
        <Select
          className={classes.selectState}
          labelId="select-state"
          value={currentState}
          onChange={handleChange}
        >
          {stateValues.map((item) => {
            return <MenuItem value={item.value}>{item.text}</MenuItem>;
          })}
        </Select>
      </Container>

      <Container>
        {items
          .filter((todoItem) =>
            currentState === 'All' ? todoItem : todoItem.state === currentState,
          )
          .map((item) => {
            return <CardTodo key={item.id} todo={item} />;
          })}
      </Container>
      <AddForm addItem={setItems} />
    </>
  );
};

export default MainPage;
