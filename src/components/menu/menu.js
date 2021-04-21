import { Menu, MenuItem } from '@material-ui/core';

const MenuCard = ({ isOpen, onCloseMenu, openDelete, openState }) => {
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
  return (
    <Menu
      anchorEl={isOpen}
      keepMounted
      open={Boolean(isOpen)}
      onClose={onCloseHandler}
    >
      <MenuItem onClick={deleteHandler}>{'Delete'}</MenuItem>
      <MenuItem onClick={stateHandler}>{'Set state'}</MenuItem>
    </Menu>
  );
};

export default MenuCard;
