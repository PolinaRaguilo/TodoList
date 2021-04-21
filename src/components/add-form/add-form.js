import {
  Button,
  colors,
  Container,
  makeStyles,
  Modal,
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
    color: colors.grey[800],
  },
  button__open: {
    display: 'block',
    margin: '0 auto',
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
  paper: {
    position: 'absolute',
    top: '25%',
    left: 0,
    right: 0,
    padding: '20px 0px 20px 0px',
    width: 700,
    borderRadius: 30,
    backgroundColor: colors.grey[100],
  },
  input: {
    width: 'auto',
  },
});

const AddForm = ({ addItem }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(true);
  };

  const closeHandler = () => {
    setOpen(false);
  };

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
    setOpen(false);
  };
  return (
    <>
      <Button className={classes.button__open} onClick={openHandler}>
        Open to add
      </Button>
      <Modal open={open} onClose={closeHandler}>
        <Container className={classes.paper}>
          <Typography className={classes.title}>Add ToDo</Typography>
          <form className={classes.root} onSubmit={onAddHandler}>
            <TextField
              label="Title"
              variant="outlined"
              className={classes.input}
              name="title"
              value={newItem.title}
              onChange={onHandleChange}
            />

            <TextField
              label="Description"
              multiline
              variant="outlined"
              name="description"
              className={classes.input}
              value={newItem.description}
              onChange={onHandleChange}
              rowsMax={5}
            />

            <Container className={classes.flex__container}>
              <Button type="submit" className={classes.button__add}>
                Add
              </Button>
            </Container>
          </form>
        </Container>
      </Modal>
    </>
  );
};

export default AddForm;
