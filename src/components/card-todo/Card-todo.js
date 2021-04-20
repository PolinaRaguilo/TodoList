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

const useStyles = makeStyles({
  root: {
    width: '90%',
    margin: '0 auto',
    marginBottom: 35,
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
    backgroundColor: colors.grey[800],
    color: colors.grey[100],
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
});

const CardTodo = ({ items, setItems, item }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [stateSelect, setState] = useState('');

  const selectValues = [
    { value: 'todo', text: 'ToDo' },
    { value: 'in-progress', text: 'In progress' },
    { value: 'done', text: 'Done' },
  ];

  const onChangeSelect = (e) => {
    setState(e.target.value);
  };

  const onOpenHandler = () => {
    setOpen(true);
  };

  const onCloseHandler = () => {
    setOpen(false);
  };

  const changeStateItem = () => {
    const newItems = items.map((todo) => {
      if (todo.id === item.id) {
        return { ...todo, state: stateSelect };
      }
      return todo;
    });
    setItems(newItems);
    setOpen(false);
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
            <Button className={classes.btn__change} onClick={onOpenHandler}>
              State
            </Button>
          </Container>
        </CardContent>
      </Card>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={onCloseHandler}
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
            onClick={onCloseHandler}
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
