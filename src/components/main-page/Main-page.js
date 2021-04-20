import {
  CircularProgress,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DB_URL } from '../../config/constants';
import AddForm from '../add-form/add-form';
import CardTodo from '../card-todo/Card-todo';
import Legend from '../legend/Legend';

const useStyles = makeStyles(() => ({
  main__title: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 20,
  },
}));

const MainPage = () => {
  const classes = useStyles();

  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${DB_URL}/items`);
      setItems(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Typography className={classes.main__title}>ToDo List</Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Container>
            {items.map((item) => {
              return <CardTodo key={item.id} todo={item} />;
            })}
          </Container>
          <Legend />
        </>
      )}
      <AddForm addItem={setItems} />
    </>
  );
};

export default MainPage;
