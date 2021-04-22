import {
  Button,
  colors,
  Container,
  makeStyles,
  Modal,
  TextField,
  Typography,
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
  modal__title: {
    fontSize: 20,
    marginBottom: 20,
    color: colors.grey[900],
    textAlign: 'center',
  },
  paper: {
    position: 'absolute',
    top: '25%',
    left: 0,
    right: 0,
    padding: '20px 10px 20px 10px',
    width: '30%',
    borderRadius: 10,
    backgroundColor: colors.grey[100],
  },
});

const EditForm = (props) => {
  const {
    open,
    onClose,
    handleEdit,
    title = '',
    description = '',
    id = null,
    state,
    createdAt,
  } = props;
  const classes = useStyles();

  const [editItem, setNew] = useState({
    title,
    description,
    id,
    state,
    createdAt,
  });

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setNew({
      ...editItem,
      [name]: value,
    });
  };

  const onUpdateHandler = async (e) => {
    e.preventDefault();
    const newData = {
      ...editItem,
      modifiedAt: new Date().toLocaleString('ru'),
    };
    try {
      const { data } = await axios.put(`${DB_URL}/items/${id}`, newData);
      handleEdit(data);
      onClose();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Container className={classes.paper}>
        <Typography className={classes.modal__title}>
          Edit information
        </Typography>
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
            <Button className={classes.button__add} onClick={onClose}>
              Cancel
            </Button>
          </Container>
        </form>
      </Container>
    </Modal>
  );
};

export default EditForm;
