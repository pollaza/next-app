import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  wrapper: {
    flexGrow: 1,
    background: "#d1d1d1"
  },
}));

function Layout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>{children}</div>
    </div>
  );
}

export default Layout;
