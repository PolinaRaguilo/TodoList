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

const CardTodo = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          Header
        </Typography>
        <Typography variant="body2" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
    </Card>
  );
};
export default CardTodo;
