import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
}));

const Score = ({ user, score, winner, total }) => {

    const classes = useStyles();

    const getInitialsFromName = (fullName) => {
        const splitted = fullName.split(' ');
        const valid = splitted.filter(word => word.length > 0);
        if (valid.length > 0) {
            const initals = valid.map(word => word[0]);
            return initals.join(" ");
        }

        return "";
    }

    return (
        <ListItem>
            <ListItemAvatar>
                {user.photo
                    ?
                    <Avatar alt={user.photo.fields.title} src={`https:${user.photo.fields.file.url}`} />
                    : <Avatar className={classes.orange}>
                        {getInitialsFromName(user.fullName)}
                    </Avatar>}

            </ListItemAvatar>
            <ListItemText primary={user.fullName} secondary={`Score: ${score} Winner: ${winner} Total: ${total}`} />
        </ListItem>
    )
}

export default Score
