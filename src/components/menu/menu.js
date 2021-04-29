import { makeStyles, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    '&:visited': {
      color: 'black',
    },
  },
}));

const MenuCard = ({
  isOpen,
  onCloseMenu,
  openDelete,
  onEdit,
  todoItemInf,
  onChangeState,
}) => {
  const classes = useStyles();
  const onCloseHandler = () => {
    onCloseMenu();
  };
  const deleteHandler = () => {
    openDelete();
    onCloseMenu();
  };
  const onEditOpen = () => {
    onEdit();
    onCloseMenu();
  };

  return (
    <Menu
      anchorEl={isOpen}
      keepMounted
      open={Boolean(isOpen)}
      onClose={onCloseHandler}
    >
      <MenuItem onClick={onEditOpen}>Edit</MenuItem>
      <MenuItem onClick={deleteHandler}>Delete</MenuItem>
      <MenuItem onClick={onChangeState}>Set state</MenuItem>
      <MenuItem onClick={onCloseHandler}>
        <Link to={`/todos/${todoItemInf.id}`} className={classes.link}>
          More information
        </Link>
      </MenuItem>
    </Menu>
  );
};

export default MenuCard;
