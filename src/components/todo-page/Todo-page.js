import {
  Button,
  Card,
  CardContent,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
const useStyles = makeStyles({
  content__wrapper: {
    padding: 30,
  },
  titles__wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  actions__wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  card__little: {
    width: 250,
    height: 50,
    paddingTop: 10,
    marginBottom: 30,
    textAlign: 'center',
  },
  card__big: {
    marginBottom: 30,
  },
  btn: {
    display: 'block',
    marginBottom: 20,
  },
});
const TodoPage = (props) => {
  const classes = useStyles();
  const { state: todoItemInf } = props.location;

  console.log(props.location);
  return (
    <Container className={classes.content__wrapper}>
      <Container className={classes.titles__wrapper}>
        <Card variant="outlined" className={classes.card__little}>
          <Typography variant="h5" component="h2">
            {todoItemInf.title}
          </Typography>
        </Card>
        <Card variant="outlined" className={classes.card__little}>
          <Typography variant="h5" component="h2">
            date
          </Typography>
        </Card>
      </Container>
      <Card
        variant="outlined"
        className={`${classes.card__big} ${todoItemInf.cardClass}`}
      >
        <CardContent>
          <Container>
            <Typography variant="body2" component="p">
              {todoItemInf.description}
            </Typography>
          </Container>
        </CardContent>
      </Card>
      <Container className={classes.actions__wrapper}>
        <Button className={classes.btn}>Edit</Button>
        <Button className={classes.btn}>Delete</Button>
      </Container>
    </Container>
  );
};

export default TodoPage;
