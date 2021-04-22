import { useState } from 'react';
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
import { nanoid } from 'nanoid';

import { useEdit } from '../../hooks';
import useData from '../../hooks/useData';
import DeleteModal from '../delete-modal/Delete-modal';

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
  const [openDelete, setOpenDelete] = useState(false);
  const { handleEdit, isEdit, onCloseEdit, editData } = useEdit();

  const { items, isLoading, setItems } = useData(`${DB_URL}/items`);

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

  const onOpenHandlerDelete = () => {
    setOpenDelete(true);
  };

  const onCloseHandlerDelete = () => {
    setOpenDelete(false);
  };

  const handleDeleteItems = (id) => {
    setItems([...items.filter((todo) => todo.id !== id)]);
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
            return (
              <MenuItem key={nanoid(2)} value={item.value}>
                {item.text}
              </MenuItem>
            );
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
                    onOpenDelete={onOpenHandlerDelete}
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

      {openDelete && (
        <DeleteModal
          isOpenDelete={openDelete}
          onClose={onCloseHandlerDelete}
          handleDelete={handleDeleteItems}
        />
      )}
      {/* <EditForm
          open={isEdit}
          onClose={onCloseEdit}
          {...editData}
          data={items}
          handleEdit={handleEditItems}
        /> */}
    </Container>
  );
};

export default MainPage;
