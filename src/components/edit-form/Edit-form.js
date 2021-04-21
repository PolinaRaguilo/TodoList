import {
  Button,
  colors,
  Container,
  makeStyles,
  TextField,
} from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';
import { DB_URL } from '../../config/constants';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
  button__add: {
    backgroundColor: colors.grey[900],
    color: colors.grey[100],
    display: 'block',
    margin: '0 auto',
    '&:hover': {
      backgroundColor: colors.grey[700],
    },
  },
  input: {
    width: 'auto',
  },
  flex__container: {
    display: 'flex',
  },
});

const EditForm = (props) => {
  const classes = useStyles();
  const initialItem = {
    title: props.todo.title,
    description: props.todo.description,
  };

  const [editItem, setNew] = useState(initialItem);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setNew({
      ...editItem,
      [name]: value,
    });
  };

  const closeHandler = () => {
    props.closeModal(false);
  };

  const onUpdateHandler = async (e) => {
    e.preventDefault();
    const newData = {
      ...props.todo,
      ...editItem,
      modifiedAt: new Date().toLocaleString('ru'),
    };
    try {
      await axios.put(`${DB_URL}/items/${props.todo.id}`, newData);
      props.setItems(
        props.items.map((todoItem) =>
          todoItem.id === props.todo.id ? newData : todoItem,
        ),
      );
      props.closeModal(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form className={classes.root}>
      <TextField
        variant="outlined"
        className={classes.input}
        name="title"
        value={editItem.title}
        onChange={onHandleChange}
      />
      <TextField
        variant="outlined"
        className={classes.input}
        name="description"
        value={editItem.description}
        onChange={onHandleChange}
      />
      <Container className={classes.flex__container}>
        <Button
          type="submit"
          className={classes.button__add}
          onClick={onUpdateHandler}
        >
          Save
        </Button>
        <Button
          type="submit"
          className={classes.button__add}
          onClick={closeHandler}
        >
          Cancel
        </Button>
      </Container>
    </form>
  );
};

export default EditForm;
