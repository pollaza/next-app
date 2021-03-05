import React, { useState, useEffect } from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const { formatToTimeZone } = require('date-fns-timezone')

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: "#fff",
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: "#fff",
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: "#aaa",
            },
            '&:hover fieldset': {
                borderColor: "#ddd",
            },
            '&.Mui-focused fieldset': {
                borderColor: "#fff",
            },
        },
        '& .MuiInputBase-input': {
            color: "#000"
        }
    }
})(TextField);

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#fff",
        color: "#000",
        padding: "2em",
        marginBottom: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        borderRadius: "10px",
        boxShadow: "2px 2px 10px #ccc"
    },
    rootClosed: {
        backgroundColor: "#ddd",
        color: "#000",
        padding: "2em",
        marginBottom: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        borderRadius: "10px",
        boxShadow: "2px 2px 10px #ccc"
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

const Bet = ({ match, team1, team2, index, changeTeam1, changeTeam2 }) => {
    const classes = useStyles();

    const [team1Score, setTeam1Score] = useState("0");
    const [team2Score, setTeam2Score] = useState("0");

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formatDate = 'D/M/YYYY';
    const formatTime = 'HH:mm';
    const formatDay = 'dddd';

    const dateFormat = formatToTimeZone(match.date, formatDate, { timeZone: timeZone });
    const timeFormat = formatToTimeZone(match.date, formatTime, { timeZone: timeZone });
    const dayFormat = formatToTimeZone(match.date, formatDay, { timeZone: timeZone });

    useEffect(() => {
        setTeam1Score(team1);
        setTeam2Score(team2);
        
    }, [team1, team2])

    const convertToInt = (val) => {
        let inputValue = 0;
        try{
            inputValue = parseInt(val);
        }catch{
            inputValue = 0;
        }

        inputValue = inputValue >= 0? inputValue: 0;

        return inputValue;
    }

    const updateTeam1 = (ev) => {
        const parsed = convertToInt(ev.target.value);
        setTeam1Score(parsed+"");
        changeTeam1(index, parsed);
    }

    const updateTeam2 = (ev) => {
        const parsed = convertToInt(ev.target.value);
        setTeam2Score(parsed+"");
        changeTeam2(index, parsed);
    }

    return (<div className={!match.closed?classes.root:classes.rootClosed}>
        <Grid container className={classes.result}>
            <Grid item xs={3}>
                <CssTextField
                    label=""
                    variant="outlined"
                    value={match.closed?team1:team1Score}
                    onChange={updateTeam1}
                    disabled={match.closed}
                />
            </Grid>
            <Grid item xs={6}>
                :
            </Grid>
            <Grid item xs={3}>
                <CssTextField
                    label=""
                    variant="outlined"
                    value={match.closed?team2:team2Score}
                    onChange={updateTeam2}
                    disabled={match.closed}
                />
            </Grid>
        </Grid>
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
    </div>)
}

export default Bet;