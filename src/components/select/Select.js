import { FormControl, Select } from '@material-ui/core';

const SelectCustom = ({ className, values, stateValue, setStateValue }) => {
  const setStateHandler = (e) => {
    setStateValue(e.target.value);
  };
  return (
    <form>
      <FormControl>
        <Select
          className={className || ''}
          native
          value={stateValue}
          onChange={setStateHandler}
        >
          {values.map((item) => {
            return <option value={item.value}>{item.text}</option>;
          })}
        </Select>
      </FormControl>
    </form>
  );
};

export default SelectCustom;
