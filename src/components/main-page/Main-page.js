import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CircularProgress,
  Container,
  makeStyles,
  Typography,
  MenuItem,
  Select,
  TextField,
  Box,
  Button,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ALL, TODO, IN_PROGRESS, DONE, DB_URL } from '../../config/constants';

import AddForm from '../add-form';
import EditForm from '../edit-form';
import CardTodo from '../card-todo';
import Legend from '../legend';
import { nanoid } from 'nanoid';

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
  searchField: {
    width: 400,
  },
  searchWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '0 20px',
  },
  btn__search: {
    marginBottom: 20,
    width: 150,
    height: 50,
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
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResult] = useState([]);

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

  const onChangeSearchHandler = (e) => {
    setSearchText(e.target.value);
  };

  const onSearch = () => {
    setSearchResult(
      items.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase()),
      ),
    );
  };
  console.log(searchResults);
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
            return (
              <MenuItem key={nanoid(2)} value={item.value}>
                {item.text}
              </MenuItem>
            );
          })}
        </Select>
      </Container>

      <Container>
        <Box className={classes.searchWrapper}>
          <Autocomplete
            className={classes.searchField}
            freeSolo
            options={items.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search..."
                margin="normal"
                variant="outlined"
                onChange={onChangeSearchHandler}
              />
            )}
          />
          <Button className={classes.btn__search} onClick={onSearch}>
            Search
          </Button>
        </Box>

        {isLoading ? (
          <CircularProgress />
        ) : (
          <Container>
            {(searchResults.length === 0
              ? items
                  .reverse()
                  .slice(items.length < 5 ? items : items.length - 5)
                  .reverse()
              : searchResults
                  .reverse()
                  .slice(
                    searchResults.length < 5
                      ? searchResults
                      : searchResults.length - 5,
                  )
                  .reverse()
            )
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
