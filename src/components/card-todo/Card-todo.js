import {
  Button,
  Card,
  CardContent,
  colors,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useState } from 'react';
import ModalWrapper from '../modal/Modal';

const useStyles = makeStyles({
  root: {
    width: '90%',
    margin: '0 auto',
    marginBottom: 35,
    position: 'relative',
  },
  title: {
    fontSize: 14,
  },
  description: {
    width: '80%',
  },
  description__wrapper: {
    padding: 0,
    display: 'flex',
  },
  icon: {
    fontSize: 30,
    position: 'absolute',
    top: 0,
    right: 0,
    cursor: 'pointer',
  },
  modal__title: {
    fontSize: 20,
    marginBottom: 20,
    color: colors.grey[900],
    textAlign: 'center',
  },
  btn__wrapper: {
    display: 'flex',
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
});

const CardTodo = ({ item, setItems, items }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(true);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  const onDelete = (id) => {
    setItems([...items.filter((item) => item.id !== id)]);
  };

  const onDeleteHanlder = () => {
    onDelete(item.id);
    setOpen(false);
  };
  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {item.title}
          </Typography>
          <Container className={classes.description__wrapper}>
            <Typography
              variant="body2"
              component="p"
              className={classes.description}
            >
              {item.description}
            </Typography>
            <DeleteIcon className={classes.icon} onClick={openHandler} />
          </Container>
        </CardContent>
      </Card>
      <ModalWrapper isOpen={open} close={closeHandler}>
        <Typography className={classes.modal__title}>Are you sure?</Typography>
        <Container className={classes.btn__wrapper}>
          <Button className={classes.btn__modal} onClick={onDeleteHanlder}>
            Yes
          </Button>
          <Button className={classes.btn__modal} onClick={closeHandler}>
            No
          </Button>
        </Container>
      </ModalWrapper>
    </>
  );
};
export default CardTodo;
