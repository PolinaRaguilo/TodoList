import {
  Button,
  colors,
  Container,
  makeStyles,
  Modal,
  TextField,
  Typography,
} from '@material-ui/core';
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

const AddForm = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(true);
  };

  const closeHandler = () => {
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
          <form className={classes.root}>
            <TextField
              label="Title"
              variant="outlined"
              className={classes.input}
            />

            <TextField
              label="Description"
              multiline
              variant="outlined"
              rowsMax={5}
            />

            <Button className={classes.button__add}>Add</Button>
          </form>
        </Container>
      </Modal>
    </>
  );
};

export default AddForm;
