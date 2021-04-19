import {
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  flex__container: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const AddForm = () => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.title}>Add ToDo</Typography>
      <form className={classes.root}>
        <Container>
          <TextField
            placeholder="Title"
            variant="outlined"
            className={classes.input}
          />
        </Container>

        <Container>
          <TextField
            placeholder="Description"
            multiline
            variant="outlined"
            rowsMax={5}
          />
        </Container>
        <Container className={classes.flex__container}>
          <Button>Add</Button>
        </Container>
      </form>
    </>
  );
};

export default AddForm;
