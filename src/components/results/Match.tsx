import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

const { formatToTimeZone } = require('date-fns-timezone')

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#000",
        color: "#fff",
        padding: "2em",
        marginBottom: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        borderRadius: "10px"
    },
    result: {
        textAlign: "center",
        fontSize: "1.5rem",
        fontWeight: "bold"
    },
    country: {
        textAlign: "center",
        fontSize: "1.0rem",
        fontWeight: "bold"
    },
    dateContainer: {
        textAlign: "center",
        fontSize: "1.0rem",
    },
    day: {
        fontWeight: "bold"
    },
    bets: {
        textAlign: "center",
        fontSize: "1.0rem",
        fontWeight: "bold",
        color: "#fff"
    },
}));

const Match = ({ match }) => {
    const classes = useStyles();

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formatDate = 'D/M/YYYY';
    const formatTime = 'HH:mm';
    const formatDay = 'dddd';

    const dateFormat = formatToTimeZone(match.date, formatDate, { timeZone: timeZone });
    const timeFormat = formatToTimeZone(match.date, formatTime, { timeZone: timeZone });
    const dayFormat = formatToTimeZone(match.date, formatDay, { timeZone: timeZone });

    return (<div className={classes.root}>
        <div className={classes.result}>{match.team1Score}:{match.team2Score}</div>
        <Grid container>
            <Grid item xs={4} className={classes.country}>
                <img
                    src={`https:${match.team1.flag}`}
                    alt={match.team1.title}
                    width={48}
                    height={48}
                /><p>{match.team1.title}</p>
            </Grid>
            <Grid item xs={4} className={classes.dateContainer}>
                <p className={classes.day}>{dayFormat}</p>
                <p>{dateFormat}</p>
                <p>{timeFormat}</p>
            </Grid>
            <Grid item xs={4} className={classes.country}>
                <img
                    src={`https:${match.team2.flag}`}
                    alt={match.team2.title}
                    width={48}
                    height={48}
                />
                <p>{match.team2.title}</p>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs={4} className={classes.bets}>
                <CircularProgressWithLabel value={60}/>
            </Grid>
            <Grid item xs={4} className={classes.bets}>
                <CircularProgressWithLabel value={10}/>
                <p>Draw</p>
            </Grid>
            <Grid item xs={4} className={classes.bets}>
                <CircularProgressWithLabel value={30}/>
            </Grid>
        </Grid>
    </div>)
}

export default Match;