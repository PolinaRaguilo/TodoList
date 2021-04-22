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
import { DB_URL, DONE, IN_PROGRESS, TODO } from '../../config/constants';
import { useEdit } from '../../hooks';
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
const TodoPage = (props) => {
  const classes = useStyles();
  const { state: todoItemInf } = props.location;
  const [openDelete, setOpenDelete] = useState(false);
  const { handleEdit, isEdit, onCloseEdit, editData } = useEdit();

  const [stateSelect, setState] = useState(todoItemInf.state);

  const onOpenHandlerDelete = () => {
    setOpenDelete(true);
  };

  const onCloseHandlerDelete = () => {
    setOpenDelete(false);
  };

  const onHandleDelete = () => {
    console.log('hi');
  };

  const handleEditItems = () => {
    console.log('edit!');
  };

  const onEdit = () => {
    handleEdit(todoItemInf);
  };

  const onStateUpdate = async (newState) => {
    await axios.put(`${DB_URL}/items/${todoItemInf.id}`, {
      ...todoItemInf,
      state: newState,
    });
  };

  const onStateHandler = (newState) => {
    onStateUpdate(newState);
    setState();
  };

  return (
    <>
      <Container className={classes.content__wrapper}>
        <Container className={classes.titles__wrapper}>
          <Card variant="outlined" className={classes.card__little}>
            <Typography variant="h5" component="h2">
              {todoItemInf.title}
            </Typography>
          </Card>
          <Card variant="outlined" className={classes.card__little}>
            <Typography variant="h5" component="h2">
              {todoItemInf.modifiedAt.split(',')[0]}
            </Typography>
          </Card>
        </Container>
        <Card variant="outlined" className={`${classes.card__big} `}>
          <CardContent>
            <Container>
              <Typography variant="body2" component="p">
                {todoItemInf.description}
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
          todoId={todoItemInf.id}
          handleDelete={onHandleDelete}
        />
      )}

      {isEdit && (
        <EditForm
          open={isEdit}
          onClose={onCloseEdit}
          {...editData}
          data={todoItemInf}
          handleEdit={handleEditItems}
        />
      )}
    </>
  );
};

export default TodoPage;
