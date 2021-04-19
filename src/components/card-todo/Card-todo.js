import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '90%',
    margin: '0 auto',
    marginBottom: 35,
  },
  title: {
    fontSize: 14,
  },
});

const CardTodo = ({ todo }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {todo.title}
        </Typography>
        <Typography variant="body2" component="p">
          {todo.description}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default CardTodo;
