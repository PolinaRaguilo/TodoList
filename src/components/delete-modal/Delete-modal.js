import {
  Button,
  colors,
  Container,
  makeStyles,
  Modal,
  Typography,
} from '@material-ui/core';

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

const DeleteModal = ({ isOpenDelete, onActionOpenDelete, onActionDelete }) => {
  const classes = useStyles();

  // const onDelete = async () => {
  //   try {
  //     await axios.delete(`${DB_URL}/items/${item.id}`);
  //     setItems([...items.filter((todo) => todo.id !== item.id)]);
  //     setOpenDelete(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const onDeleteAction = () => {
    onActionDelete();
  };

  const onDeleteOpen = () => {
    onActionOpenDelete();
  };
  return (
    <Modal open={isOpenDelete} onClose={onDeleteOpen}>
      <Container className={classes.paper}>
        <Typography className={classes.modal__title}>Are you sure?</Typography>
        <Container className={classes.btn__wrapper}>
          <Button className={classes.btn__modal} onClick={onDeleteAction}>
            Yes
          </Button>
          <Button className={classes.btn__modal} onClick={onDeleteOpen}>
            No
          </Button>
        </Container>
      </Container>
    </Modal>
  );
};

export default DeleteModal;
