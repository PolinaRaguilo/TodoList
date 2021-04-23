import { AppBar, Box, colors, makeStyles, Tab, Tabs } from '@material-ui/core';
import { useState } from 'react';
import { DB_URL } from '../../config/constants';
import useData from '../../hooks/useData';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: 400,
    borderRadius: 10,
    position: 'absolute',
    top: 30,
    left: 30,
  },
  tabs: {
    backgroundColor: colors.grey[600],
  },
  singleTab: {
    minWidth: 100,
    padding: 0,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const CustomTabs = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const { items } = useData(`${DB_URL}/items`);
  // eslint-disable-next-line no-unused-vars
  let forFilter = items;

  console.log(items);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} className={classes.tabs}>
          <Tab label="All" className={classes.singleTab} />
          <Tab label="ToDo" className={classes.singleTab} />
          <Tab label="In progress" className={classes.singleTab} />
          <Tab label="Done" className={classes.singleTab} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        All
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* {forFilter.filter((t) =>
          t.state === 'ToDo' ? <li>{t.title}</li> : null,
        )} */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item four
      </TabPanel>
    </div>
  );
};

export default CustomTabs;
