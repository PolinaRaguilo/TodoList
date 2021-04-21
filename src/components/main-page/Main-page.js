import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CircularProgress,
  Container,
  makeStyles,
  Typography,
  MenuItem,
  Select,
} from '@material-ui/core';
import { ALL, TODO, IN_PROGRESS, DONE, DB_URL } from '../../config/constants';

import AddForm from '../add-form/add-form';
import EditForm from '../edit-form/Edit-form';
import CardTodo from '../card-todo/Card-todo';
import Legend from '../legend/Legend';

import { useEdit } from '../../hooks';

const useStyles = makeStyles(() => ({
  main__title: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 20,
    marginRight: 100,
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  selectState: {
    width: 200,
    height: 40,
    marginRight: 45,
  },
}));

const stateValues = [
  { value: ALL, text: ALL },
  { value: TODO, text: TODO },
  { value: IN_PROGRESS, text: IN_PROGRESS },
  { value: DONE, text: DONE },
];

const MainPage = () => {
  const classes = useStyles();
  const [currentState, setCurrentState] = useState('All');
  const { handleEdit, isEdit, onCloseEdit, editData } = useEdit();
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${DB_URL}/items`);
      setItems(response.data);
      setLoading(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (event) => {
    setCurrentState(event.target.value);
  };

  const handleEditItems = (data) => {
    const editedItemIdx = items.map(({ id }) => id).indexOf(data.id);

    setItems((prev) => {
      const temp = [...prev];
      temp.splice(editedItemIdx, 1, data);
      return temp;
    });
  };

  return (
    <Container>
      <Container className={classes.wrapper}>
        <Typography className={classes.main__title}>ToDo List</Typography>
        <Select
          className={classes.selectState}
          labelId="select-state"
          value={currentState}
          onChange={handleChange}
        >
          {stateValues.map((item) => {
            return <MenuItem value={item.value}>{item.text}</MenuItem>;
          })}
        </Select>
      </Container>

      <Container>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Container>
            {items
              .filter((todoItem) =>
                currentState === ALL
                  ? todoItem
                  : todoItem.state === currentState,
              )
              .map((item) => {
                return (
                  <CardTodo
                    key={item.id}
                    item={item}
                    setItems={setItems}
                    items={items}
                    onEdit={handleEdit}
                  />
                );
              })}
          </Container>
        )}
      </Container>
      <Legend />
      <AddForm addItem={setItems} />
      {isEdit && (
        <EditForm
          open={isEdit}
          onClose={onCloseEdit}
          {...editData}
          data={items}
          handleEdit={handleEditItems}
        />
      )}
    </Container>
  );
};

export default MainPage;
