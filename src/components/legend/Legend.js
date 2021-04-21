import { colors, Container, makeStyles, Typography } from '@material-ui/core';
import { nanoid } from 'nanoid';
const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '45%',
    backgroundColor: colors.grey[100],
    marginBottom: 35,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    color: colors.grey[900],
    marginLeft: 5,
  },
  box__color: {
    padding: 0,
    maxWidth: 30,
    height: 30,
    margin: 0,
  },
  color__wrapper: {
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todo: {
    backgroundColor: '#ffcdd2',
  },
  inProgress: {
    backgroundColor: '#64ffda',
  },
  done: {
    backgroundColor: '#bdbdbd',
  },
});

const legendsList = [
  { classStyle: 'todo', text: 'ToDo' },
  { classStyle: 'inProgress', text: 'In progress' },
  { classStyle: 'done', text: 'Done' },
];

const Legend = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      {legendsList.map((item) => {
        return (
          <Container key={nanoid(2)} className={classes.color__wrapper}>
            <Container
              className={`${classes.box__color} ${classes[item.classStyle]}`}
            />
            <Typography className={classes.title}>{item.text}</Typography>
          </Container>
        );
      })}
    </Container>
  );
};

export default Legend;
