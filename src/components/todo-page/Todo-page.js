import {
  Button,
  Card,
  CardContent,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router';
import { DB_URL, DONE, IN_PROGRESS, TODO } from '../../config/constants';
import { useEdit } from '../../hooks';
import useData from '../../hooks/useData';
import DeleteModal from '../delete-modal/Delete-modal';
import EditForm from '../edit-form/Edit-form';
import SelectCustom from '../select/Select';

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
  select: {
    width: 200,
  },
});

const stateValues = [
  { value: TODO, text: TODO },
  { value: IN_PROGRESS, text: IN_PROGRESS },
  { value: DONE, text: DONE },
];
const TodoPage = () => {
  const classes = useStyles();
  const { id: currentId } = useParams();

  const { items: currentTodo, isLoading, setItems } = useData(
    `${DB_URL}/items/${currentId}`,
  );

  const [openDelete, setOpenDelete] = useState(false);
  const { handleEdit, isEdit, onCloseEdit, editData } = useEdit();

  const [stateSelect, setState] = useState(currentTodo.state);
  console.log(currentTodo.state);

  const onOpenHandlerDelete = () => {
    setOpenDelete(true);
  };

  const onCloseHandlerDelete = () => {
    setOpenDelete(false);
  };

  const onHandleDelete = () => {
    console.log('hi');
  };

  const handleEditItems = (data) => {
    setItems(data);
  };

  const onEdit = () => {
    handleEdit(currentTodo);
  };

  const onStateUpdate = async (newState) => {
    await axios.put(`${DB_URL}/items/${currentTodo.id}`, {
      ...currentTodo,
      state: newState,
    });
  };

  const onStateHandler = (newState) => {
    onStateUpdate(newState);
    setState();
  };

  if (isLoading) {
    return (
      <Typography variant="h5" component="h2">
        Loading...
      </Typography>
    );
  }

  return (
    <>
      <Container className={classes.content__wrapper}>
        <Container className={classes.titles__wrapper}>
          <Card variant="outlined" className={classes.card__little}>
            <Typography variant="h5" component="h2">
              {currentTodo.title}
            </Typography>
          </Card>
          <Card variant="outlined" className={classes.card__little}>
            <Typography variant="h5" component="h2">
              {/* {currentTodo.modifiedAt.split(',')[0]} */}
              {currentTodo.modifiedAt}
            </Typography>
          </Card>
        </Container>
        <Card variant="outlined" className={`${classes.card__big} `}>
          <CardContent>
            <Container>
              <Typography variant="body2" component="p">
                {currentTodo.description}
              </Typography>
            </Container>
          </CardContent>
        </Card>
        <Container className={classes.actions__wrapper}>
          <SelectCustom
            className={classes.select}
            values={stateValues}
            stateValue={stateSelect}
            setStateValue={onStateHandler}
          />

          <Button className={classes.btn} onClick={onEdit}>
            Edit
          </Button>
          <Button className={classes.btn} onClick={onOpenHandlerDelete}>
            Delete
          </Button>
        </Container>
      </Container>
      {openDelete && (
        <DeleteModal
          isOpenDelete={openDelete}
          onClose={onCloseHandlerDelete}
          todoId={currentTodo.id}
          handleDelete={onHandleDelete}
        />
      )}

      {isEdit && (
        <EditForm
          open={isEdit}
          onClose={onCloseEdit}
          {...editData}
          data={currentTodo}
          handleEdit={handleEditItems}
        />
      )}
    </>
  );
};

export default TodoPage;
