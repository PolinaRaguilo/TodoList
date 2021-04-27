import {
  Button,
  colors,
  Box,
  makeStyles,
  Modal,
  TextField,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';
import { DB_URL } from '../../config/constants';

const useStyles = makeStyles({
  root: {},
  button__add: {
    backgroundColor: colors.grey[900],
    color: colors.grey[100],
    width: 160,
    '&:hover': {
      backgroundColor: colors.grey[700],
    },
  },
  input: {
    marginBottom: 32,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  modal__title: {
    fontSize: 20,
    marginBottom: 20,
    color: colors.grey[900],
    textAlign: 'center',
  },
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '32px 24px',
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
      <Box className={classes.paper}>
        <Typography className={classes.modal__title}>
          Edit information
        </Typography>
        <form className={classes.root}>
          <TextField
            fullWidth
            variant="outlined"
            name="title"
            value={editItem.title}
            onChange={onHandleChange}
          />
          <TextField
            fullWidth
            variant="outlined"
            name="description"
            className={classes.input}
            value={editItem.description}
            onChange={onHandleChange}
          />
          <Box className={classes.buttonContainer}>
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
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditForm;
