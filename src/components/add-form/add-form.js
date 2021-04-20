import {
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { nanoid } from 'nanoid';
import { useState } from 'react';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  flex__container: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const AddForm = ({ addItem }) => {
  const classes = useStyles();

  const initialItem = {
    title: '',
    description: '',
  };

  const [newItem, setNew] = useState(initialItem);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setNew({
      ...newItem,
      [name]: value,
    });
  };

  const onAddHandler = (e) => {
    e.preventDefault();
    addItem((prev) => [
      ...prev,
      {
        id: nanoid(5),
        ...newItem,
      },
    ]);
    setNew(initialItem);
  };
  return (
    <>
      <Typography className={classes.title}>Add ToDo</Typography>
      <form className={classes.root} onSubmit={onAddHandler}>
        <Container>
          <TextField
            placeholder="Title"
            variant="outlined"
            className={classes.input}
            name="title"
            value={newItem.title}
            onChange={onHandleChange}
          />
        </Container>

        <Container>
          <TextField
            placeholder="Description"
            multiline
            variant="outlined"
            name="description"
            value={newItem.description}
            onChange={onHandleChange}
            rowsMax={5}
          />
        </Container>
        <Container className={classes.flex__container}>
          <Button type="submit">Add</Button>
        </Container>
      </form>
    </>
  );
};

export default AddForm;
