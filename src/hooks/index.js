import { useReducer } from 'react';

const initialState = {
  editData: {},
  isEdit: false,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'edit':
      return {
        isEdit: true,
        editData: payload,
      };
    case 'close':
      return initialState;
    default:
      return state;
  }
};

export const useEdit = () => {
  const [{ editData, isEdit }, dispatch] = useReducer(reducer, initialState);

  const handleEdit = (payload) => {
    dispatch({ type: 'edit', payload });
  };

  const handleCloseEdit = () => {
    dispatch({ type: 'close' });
  };

  return { handleEdit, isEdit, onCloseEdit: handleCloseEdit, editData };
};
