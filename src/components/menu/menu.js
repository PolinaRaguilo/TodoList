import { Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

const MenuCard = ({
  isOpen,
  onCloseMenu,
  openDelete,
  openState,
  onEdit,
  todoItemInf,
  cardClass,
}) => {
  const onCloseHandler = () => {
    onCloseMenu();
  };
  const stateHandler = () => {
    openState();
    onCloseMenu();
  };
  const deleteHandler = () => {
    openDelete();
    onCloseMenu();
  };
  const onEditOpen = () => {
    onEdit(todoItemInf);
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
      <MenuItem onClick={stateHandler}>Set state</MenuItem>
      <MenuItem onClick={onCloseHandler}>
        <Link
          to={{
            pathname: `/todos/${todoItemInf.id}`,
            state: { ...todoItemInf, cardClass },
          }}
        >
          More information
        </Link>
      </MenuItem>
    </Menu>
  );
};

export default MenuCard;
