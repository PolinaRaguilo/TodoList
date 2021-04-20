import {
  Button,
  Card,
  CardContent,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import MenuCard from '../menu/menu';

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
    display: 'block',
    width: 200,
    position: 'absolute',
    marginRight: 0,
    bottom: '35%',
    right: 10,
  },
});

const CardTodo = ({ todo }) => {
  const classes = useStyles();

  const [menu, setMenu] = useState(null);

  const handleClick = (event) => {
    setMenu(event.currentTarget);
  };

  const handleClose = () => {
    setMenu(null);
  };

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {todo.title}
          </Typography>
          <Typography variant="body2" component="p">
            {todo.description}
          </Typography>
        </CardContent>
        <Button onClick={handleClick} className={classes.btn__open}>
          Open Menu
        </Button>
      </Card>
      <MenuCard isOpen={menu} onCloseMenu={handleClose} />
    </>
  );
};
export default CardTodo;
