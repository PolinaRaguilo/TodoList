import { Menu, MenuItem } from '@material-ui/core';
import { nanoid } from 'nanoid';

const MenuCard = ({ isOpen, onCloseMenu }) => {
  const menuItems = ['Delete', 'Set state'];

  const onCloseHandler = () => {
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
        return (
          <MenuItem key={nanoid(2)} onClick={onCloseHandler}>
            {item}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export default MenuCard;
