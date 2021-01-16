import { makeStyles } from "@material-ui/core/styles";
import Navigation from "./navigation";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  wrapper: {
    flexGrow: 1,
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
