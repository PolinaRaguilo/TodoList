import { useReducer } from 'react';

const initialState = {
  editData: {},
  isEdit: false,
  isEditState: false,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'edit':
      return {
        isEdit: true,
        editData: payload,
      };
    case 'editState':
      return {
        isEditState: true,
        editData: payload,
      };
    case 'close':
      return initialState;
    default:
      return state;
  }
};

export const useEdit = () => {
  const [{ editData, isEdit, isEditState }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const handleEditState = (payload) => {
    dispatch({ type: 'editState', payload });
  };
  const handleEdit = (payload) => {
    dispatch({ type: 'edit', payload });
  };

  const handleCloseEdit = () => {
    dispatch({ type: 'close' });
  };

  return {
    handleEditState,
    handleEdit,
    isEdit,
    isEditState,
    onCloseEdit: handleCloseEdit,
    editData,
  };
};
