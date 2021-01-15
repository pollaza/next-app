import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.main,
  },
}));

function ListItemLink({ to, ...props }) {
  return (
    <Link href={to} passHref>
      <ListItem button component="a" {...props} />
    </Link>
  );
}

function SimpleList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemLink to="/">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemLink>
        <ListItemLink to="/results">
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Results" />
        </ListItemLink>
        <ListItemLink to="/about">
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItemLink>
      </List>
    </div>
  );
}

export default SimpleList;
