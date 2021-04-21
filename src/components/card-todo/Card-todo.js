import {
  Button,
  Card,
  CardContent,
  colors,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  makeStyles,
  Select,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
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
  description__wrapper: {
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  btn__change: {
    minWidth: 180,
    height: 30,
    marginRight: 0,
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
  todo: {
    backgroundColor: '#ffcdd2',
  },
  inProgress: {
    backgroundColor: '#64ffda',
  },
  done: {
    backgroundColor: '#bdbdbd',
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
  icon: {
    fontSize: 30,
    position: 'absolute',
    top: 5,
    right: 0,
    cursor: 'pointer',
  },
});

const CardTodo = ({ items, setItems, item }) => {
  const classes = useStyles();

  const [openDelete, setOpenDelete] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [stateSelect, setState] = useState('');

  const selectValues = [
    { value: 'todo', text: 'ToDo' },
    { value: 'in-progress', text: 'In progress' },
    { value: 'done', text: 'Done' },
  ];

  const onChangeSelect = (e) => {
    setState(e.target.value);
  };

  const onOpenHandlerDelete = () => {
    setOpenDelete(true);
  };

  const onCloseHandlerDelete = () => {
    setOpenDelete(false);
  };

  const onOpenHandlerState = () => {
    setOpenState(true);
  };

  const onCloseHandlerState = () => {
    setOpenState(false);
  };

  const changeStateItem = () => {
    const newItems = items.map((todo) => {
      if (todo.id === item.id) {
        return { ...todo, state: stateSelect };
      }
      return todo;
    });
    setItems(newItems);
    setOpenState(false);
  };

  const onDelete = (id) => {
    setItems([...items.filter((item) => item.id !== id)]);
  };

  const onDeleteHanlder = () => {
    onDelete(item.id);
    setOpenDelete(false);
  };

  const stateClass = () => {
    let classState = classes.root;
    switch (item.state) {
      case 'todo':
        return classState + ` ${classes.todo}`;
      case 'in-progress':
        return classState + ` ${classes.inProgress}`;
      case 'done':
        return classState + ` ${classes.done}`;
      default:
        return classState;
    }
  };
  const cardClass = stateClass();

  return (
    <>
      <Card className={cardClass} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {item.title}
          </Typography>
          <Container className={classes.description__wrapper}>
            <Typography variant="body2" component="p">
              {item.description}
            </Typography>
            <Button
              className={classes.btn__change}
              onClick={onOpenHandlerState}
            >
              State
            </Button>
            <DeleteIcon
              className={classes.icon}
              onClick={onOpenHandlerDelete}
            />
          </Container>
        </CardContent>
      </Card>

      <ModalWrapper isOpen={openDelete} close={onCloseHandlerDelete}>
        <Typography className={classes.modal__title}>Are you sure?</Typography>
        <Container className={classes.btn__wrapper}>
          <Button className={classes.btn__modal} onClick={onDeleteHanlder}>
            Yes
          </Button>
          <Button className={classes.btn__modal} onClick={onCloseHandlerDelete}>
            No
          </Button>
        </Container>
      </ModalWrapper>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={openState}
        onClose={onCloseHandlerState}
      >
        <DialogTitle>Select state </DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <Select native value={stateSelect} onChange={onChangeSelect}>
                {selectValues.map((item) => {
                  return <option value={item.value}>{item.text}</option>;
                })}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onCloseHandlerState}
            className={`${classes.btn__change} ${classes.btn__modal}`}
          >
            Cancel
          </Button>
          <Button
            onClick={changeStateItem}
            className={`${classes.btn__change} ${classes.btn__modal}`}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default CardTodo;
