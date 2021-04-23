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
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuCard from '../menu';
import { DB_URL, DONE, IN_PROGRESS, TODO } from '../../config/constants';
import SelectCustom from '../select/Select';
import axios from 'axios';
import DeleteModal from '../delete-modal';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    width: '90%',
    margin: '0 auto',
    marginBottom: 35,
    padding: 15,
  },
  title: {
    fontSize: 14,
  },
  btn__open: {
    backgroundColor: colors.grey[800],
    color: colors.grey[100],
    display: 'block',
    width: 200,
    position: 'absolute',
    marginRight: 0,
    bottom: '35%',
    right: 10,
    '&:hover': {
      backgroundColor: colors.grey[600],
    },
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
  modal__title: {
    fontSize: 20,
    marginBottom: 20,
    color: colors.grey[900],
    textAlign: 'center',
  },
});

const CardTodo = ({ items, setItems, item, onEdit, handleDelete }) => {
  const classes = useStyles();

  const [menu, setMenu] = useState(null);
  const [openState, setOpenState] = useState(false);
  const [stateSelect, setState] = useState('');
  const [openDelete, setOpenDelete] = useState(false);

  const selectValues = [
    { value: TODO, text: TODO },
    { value: IN_PROGRESS, text: IN_PROGRESS },
    { value: DONE, text: DONE },
  ];

  const handleClickMenu = (event) => {
    setMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenu(null);
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
        axios.put(`${DB_URL}/items/${todo.id}`, {
          ...todo,
          state: stateSelect,
        });
        return { ...todo, state: stateSelect };
      }
      return todo;
    });
    setItems(newItems);
    setOpenState(false);
  };

  const stateClass = () => {
    let classState = classes.root;
    switch (item.state) {
      case TODO:
        return classState + ` ${classes.todo}`;
      case IN_PROGRESS:
        return classState + ` ${classes.inProgress}`;
      case DONE:
        return classState + ` ${classes.done}`;
      default:
        return classState;
    }
  };
  const cardClass = stateClass();

  const onCloseHandlerDelete = () => {
    setOpenDelete(false);
  };

  const onOpenHandlerDelete = () => {
    setOpenDelete(true);
  };

  const handleEdit = () => {
    onEdit(item);
  };

  const onHandleDelete = () => {
    handleDelete(item.id);
  };
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
            <MoreVertIcon className={classes.icon} onClick={handleClickMenu} />
          </Container>
        </CardContent>
      </Card>

      <MenuCard
        isOpen={menu}
        onCloseMenu={handleCloseMenu}
        openDelete={onOpenHandlerDelete}
        openState={onOpenHandlerState}
        todoItemInf={item}
        onEdit={handleEdit}
      />

      {openDelete && (
        <DeleteModal
          isOpenDelete={openDelete}
          onClose={onCloseHandlerDelete}
          handleDelete={onHandleDelete}
          todoId={item.id}
        />
      )}

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={openState}
        onClose={onCloseHandlerState}
      >
        <DialogTitle>Select state </DialogTitle>
        <DialogContent>
          <SelectCustom
            values={selectValues}
            stateValue={stateSelect}
            setStateValue={setState}
          />
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
