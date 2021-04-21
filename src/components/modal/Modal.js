import { colors, Container, makeStyles, Modal } from '@material-ui/core';

const useStyles = makeStyles({
  paper: {
    position: 'absolute',
    top: '25%',
    left: 0,
    right: 0,
    padding: '20px 10px 20px 10px',
    width: '30%',
    borderRadius: 10,
    backgroundColor: colors.grey[100],
  },
});

const ModalWrapper = (props) => {
  const classes = useStyles();
  const { isOpen, close } = props;

  const onCloseHandler = () => {
    close(false);
  };
  return (
    <Modal open={isOpen} onClose={onCloseHandler}>
      <Container className={classes.paper}>{props.children}</Container>
    </Modal>
  );
};

export default ModalWrapper;
