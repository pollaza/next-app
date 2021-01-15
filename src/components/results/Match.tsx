import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Image from 'next/image'

import Grid from "@material-ui/core/Grid";

import localeEM from 'date-fns/locale/en-US';
import format from 'date-fns/format';
const { parseFromTimeZone, formatToTimeZone } = require('date-fns-timezone')

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "#000",
      color: "#fff",
      padding: "2em",
      marginBottom:"10px",
      marginLeft: "10px",
      marginRight: "10px",
    },
    result: {
      textAlign: "center",
      fontSize: "1.5rem"
    },
    country: {
        margin: "0",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)"
      }
  }));

const Match = ({match}) => {
    const classes = useStyles();

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const format = 'D.M.YYYY HH:mm'

    const output = formatToTimeZone(match.date, format, { timeZone: timeZone });

    return (<div className={classes.root}>
        <div className={classes.result}>{match.team1Score}:{match.team2Score}</div>
        <Grid container>
            <Grid item xs={4}>
                <p>{match.team1.title} <span><img
        src={`https:${match.team1.flag}`}
        alt="Picture of the author"
        width={48}
        height={48}
      /></span></p>
            </Grid>
            <Grid item xs={4}>
                {output}
            </Grid>
            <Grid item xs={4}>
            <p>{match.team2.title} <span><img
        src={`https:${match.team2.flag}`}
        alt="Picture of the author"
        width={48}
        height={48}
      /></span></p>
            </Grid>
        </Grid>
    </div>)
}

export default Match;