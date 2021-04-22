import { Menu, MenuItem } from '@material-ui/core';

const MenuCard = ({
  isOpen,
  onCloseMenu,
  openDelete,
  openState,
  onOpenEdit,
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
    onOpenEdit(true);
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
      <MenuItem onClick={deleteHandler}>{'Delete'}</MenuItem>
      <MenuItem onClick={stateHandler}>{'Set state'}</MenuItem>
    </Menu>
  );
};

export default MenuCard;
