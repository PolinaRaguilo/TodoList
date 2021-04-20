import {
  Button,
  Container,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import AddForm from '../add-form/add-form';
import CardTodo from '../card-todo/Card-todo';

const useStyles = makeStyles(() => ({
  main__title: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 20,
  },
  btn__open: {
    display: 'block',
    width: 200,
    marginBottom: 20,
    margin: '0 auto',
  },
}));

const MainPage = () => {
  const classes = useStyles();

  const [menu, setMenu] = useState(null);

  const handleClick = (event) => {
    setMenu(event.currentTarget);
  };

  const handleClose = () => {
    setMenu(null);
  };

  const [items, setItems] = useState([
    { id: 0, title: 'Reading', description: 'Read one book' },
  ]);

  const menuItems = ['Profile', 'Add Item'];

  return (
    <>
      <Typography className={classes.main__title}>ToDo List</Typography>
      <Button onClick={handleClick} className={classes.btn__open}>
        Open Menu
      </Button>
      <Menu
        className={classes.menu__wrapper}
        anchorEl={menu}
        keepMounted
        open={Boolean(menu)}
        onClose={handleClose}
      >
        {menuItems.map((item) => {
          return <MenuItem onClick={handleClose}>{item}</MenuItem>;
        })}
      </Menu>
      <Container>
        {items.map((item) => {
          return <CardTodo key={item.id} todo={item} />;
        })}
      </Container>
      <AddForm addItem={setItems} />
    </>
  );
};

export default MainPage;
