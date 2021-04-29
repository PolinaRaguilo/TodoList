import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

import SelectCustom from './select/Select';

import { DONE, IN_PROGRESS, TODO, DB_URL } from '../config/constants';

const useStyles = makeStyles(() => ({
  root: {},
}));

const selectValues = [
  { value: TODO, text: TODO },
  { value: IN_PROGRESS, text: IN_PROGRESS },
  { value: DONE, text: DONE },
];

const StateModal = ({ state, onClose, handleEdit, id, ...props }) => {
  const classes = useStyles();
  const [stateSelect, setState] = useState(state);

  const onUpdateHandler = async (e) => {
    e.preventDefault();
    const newData = {
      ...props,
      state: stateSelect,
      modifiedAt: new Date().toLocaleString('ru'),
    };
    try {
      const { data } = await axios.put(`${DB_URL}/items/${id}`, newData);
      handleEdit(data);
      onClose();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={true}
      onClose={props.onClose}
    >
      <DialogTitle>Select state </DialogTitle>
      <DialogContent>
        <SelectCustom
          className={classes.select}
          values={selectValues}
          stateValue={stateSelect}
          setStateValue={setState}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.onClose}
          className={`${classes.btn__change} ${classes.btn__modal}`}
        >
          Cancel
        </Button>
        <Button
          onClick={onUpdateHandler}
          className={`${classes.btn__change} ${classes.btn__modal}`}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StateModal;
