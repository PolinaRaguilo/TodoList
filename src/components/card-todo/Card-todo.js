import {
  Card,
  CardContent,
  colors,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuCard from '../menu';
import { DONE, IN_PROGRESS, TODO } from '../../config/constants';
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
  select: {
    width: 350,
  },
});

const CardTodo = ({ item, onEdit, handleDelete, onEditState }) => {
  const classes = useStyles();

  const [menu, setMenu] = useState(null);

  const [openDelete, setOpenDelete] = useState(false);

  const handleClickMenu = (event) => {
    setMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenu(null);
  };

  const stateClasses = {
    [TODO]: classes.todo,
    [IN_PROGRESS]: classes.inProgress,
    [DONE]: classes.done,
  };

  const onCloseHandlerDelete = () => {
    setOpenDelete(false);
  };

  const onOpenHandlerDelete = () => {
    setOpenDelete(true);
  };

  const handleEdit = () => {
    onEdit(item);
  };

  const handleStateUpdate = () => {
    onEditState(item);
  };

  const onHandleDelete = () => {
    handleDelete(item.id);
  };
  return (
    <>
      <Card
        className={`${stateClasses[item.state]} ${classes.root}`}
        variant="outlined"
      >
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
        onChangeState={handleStateUpdate}
        onEdit={handleEdit}
        todoItemInf={item}
      />

      {openDelete && (
        <DeleteModal
          isOpenDelete={openDelete}
          onClose={onCloseHandlerDelete}
          handleDelete={onHandleDelete}
          todoId={item.id}
        />
      )}
    </>
  );
};
export default CardTodo;
