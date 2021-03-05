import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const { formatToTimeZone } = require('date-fns-timezone')

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
        color: "#000"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    accordionDetails: {
        display: 'block',
        textAlign: 'center'
    }
}));

const Match = ({ match, percent, bets }) => {
    const classes = useStyles();

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formatDate = 'D/M/YYYY';
    const formatTime = 'HH:mm';
    const formatDay = 'dddd';

    const dateFormat = formatToTimeZone(match.date, formatDate, { timeZone: timeZone });
    const timeFormat = formatToTimeZone(match.date, formatTime, { timeZone: timeZone });
    const dayFormat = formatToTimeZone(match.date, formatDay, { timeZone: timeZone });

    console.log(bets);

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
        {percent ? <Grid container>
            <Grid item xs={4} className={classes.bets}>
                <CircularProgressWithLabel value={percent.t1Percent} />
            </Grid>
            <Grid item xs={4} className={classes.bets}>
                <CircularProgressWithLabel value={percent.drawPercent} />
                <p>Draw</p>
            </Grid>
            <Grid item xs={4} className={classes.bets}>
                <CircularProgressWithLabel value={percent.t2Percent} />
            </Grid>
        </Grid> : <></>}
        {match.closed ? <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>Bets</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                {bets?bets.map(bet => (<Grid container key={bet.id}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">{bet.user}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>{bet.team1}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>{bet.team2}</Typography>
                    </Grid>
                </Grid>)):<></>}

            </AccordionDetails>
        </Accordion> : <></>}

    </div>)
}

export default Match;