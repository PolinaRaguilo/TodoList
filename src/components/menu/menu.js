import { Menu, MenuItem } from '@material-ui/core';

const MenuCard = ({ isOpen, onCloseMenu, onOpenEdit }) => {
  const menuItems = ['Delete', 'Set state'];

  const onCloseHandler = () => {
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
      {menuItems.map((item) => {
        return <MenuItem onClick={onCloseHandler}>{item}</MenuItem>;
      })}
      <MenuItem onClick={onEditOpen}>Edit</MenuItem>
    </Menu>
  );
};

export default MenuCard;
