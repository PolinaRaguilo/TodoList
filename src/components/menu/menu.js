import { Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

const MenuCard = ({ isOpen, onCloseMenu, todoItemInf, cardClass }) => {
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
        return <MenuItem onClick={onCloseHandler}>{item}</MenuItem>;
      })}
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
