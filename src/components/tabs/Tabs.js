import { AppBar, Box, colors, makeStyles, Tab, Tabs } from '@material-ui/core';
import { useState } from 'react';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { DB_URL, DONE, IN_PROGRESS, TODO } from '../../config/constants';
import useData from '../../hooks/useData';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    backgroundColor: colors.grey[600],
  },
  singleTab: {
    minWidth: 'auto',
    padding: 0,
  },
  text: {
    color: 'black',
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
      {value === index && (
        <Box p={3}>
          <List>{children}</List>
        </Box>
      )}
    </div>
  );
}

const CustomTabs = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const { items } = useData(`${DB_URL}/items`);
  // eslint-disable-next-line no-unused-vars
  let forFilter = items;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          className={classes.tabs}
          variant="fullWidth"
        >
          <Tab label="All" className={classes.singleTab} />
          <Tab label="ToDo" className={classes.singleTab} />
          <Tab label="In progress" className={classes.singleTab} />
          <Tab label="Done" className={classes.singleTab} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {forFilter.map((it) => {
          return (
            <ListItem button>
              <ListItemText className={classes.text}>{it.title}</ListItemText>
            </ListItem>
          );
        })}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {forFilter
          .filter((item) => item.state === TODO)
          .map((it) => {
            return (
              <ListItem button>
                <ListItemText className={classes.text}>{it.title}</ListItemText>
              </ListItem>
            );
          })}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {forFilter
          .filter((item) => item.state === IN_PROGRESS)
          .map((it) => {
            return (
              <ListItem button>
                <ListItemText className={classes.text}>{it.title}</ListItemText>
              </ListItem>
            );
          })}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {forFilter
          .filter((item) => item.state === DONE)
          .map((it) => {
            return (
              <ListItem button>
                <ListItemText className={classes.text}>{it.title}</ListItemText>
              </ListItem>
            );
          })}
      </TabPanel>
    </Box>
  );
};

export default CustomTabs;
