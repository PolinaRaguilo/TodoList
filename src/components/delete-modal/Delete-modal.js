import {
  Button,
  colors,
  Container,
  makeStyles,
  Modal,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import { DB_URL } from '../../config/constants';
import useData from '../../hooks/useData';

const useStyles = makeStyles({
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
  modal__title: {
    fontSize: 20,
    marginBottom: 20,
    color: colors.grey[900],
    textAlign: 'center',
  },
  btn__modal: {
    backgroundColor: colors.grey[900],
    color: colors.grey[100],
    display: 'block',
    margin: '0 auto',
    '&:hover': {
      backgroundColor: colors.grey[700],
    },
  },
  btn__wrapper: {
    display: 'flex',
  },
});

const DeleteModal = ({ isOpenDelete, onActionCloseDelete, todoId }) => {
  const classes = useStyles();

  const { items, setItems } = useData(`${DB_URL}/items`);

  const onDeleteClose = () => {
    onActionCloseDelete();
  };

  const onDeleteHanlder = async () => {
    try {
      await axios.delete(`${DB_URL}/items/${todoId}`);
      setItems([...items.filter((todo) => todo.id !== todoId)]);
      onDeleteClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal open={isOpenDelete} onClose={onDeleteClose}>
      <Container className={classes.paper}>
        <Typography className={classes.modal__title}>Are you sure?</Typography>
        <Container className={classes.btn__wrapper}>
          <Button className={classes.btn__modal} onClick={onDeleteHanlder}>
            Yes
          </Button>
          <Button className={classes.btn__modal} onClick={onDeleteClose}>
            No
          </Button>
        </Container>
      </Container>
    </Modal>
  );
};

export default DeleteModal;
