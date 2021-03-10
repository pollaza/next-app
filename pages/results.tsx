import React, { useEffect, useState } from 'react'

import AppLayout from "../components/AppLayout";

import Match from "../src/components/results/Match"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { _useAxios, authSync } from "../services";
import axios from 'axios';
import Score from "../src/components/scoreBoard/Score";

const Results = (props) => {

    console.log(props);

    const [phaseName, setPhaseName] = useState("");
    const [percents, setPercents] = useState({});
    const [currentBets, setCurrentBets] = useState({});
    // const [{ data, loading }, executeGetPhase] = _useAxios(
    //     { url: '/phase/results', method: 'GET' },
    //     { manual: true }
    // )

    // const [{ data:scoreBoardData, loading:scoreBoardLoading }, executeGetScoreBoard] = _useAxios(
    //     { url: '/phase/ScoreBoard', method: 'GET' },
    //     { manual: true }
    // )

    useEffect(() => {
        //executeGetPhase();
        //executeGetScoreBoard();
        return () => {

        }
    }, [])


    useEffect(() => {
        if (props.resultsData) {
            const { phase } = props.resultsData;
            const { matches } = props.resultsData;
            const { userScores } = props.resultsData;

            let matchPercents = {};
            let matchBets = {};

            matches.forEach(match => {
                const id = match.sys.id;
                const matchScores = userScores.filter(us => us.match.sys.id === id);
                let t1Win = 0;
                let t2Win = 0;
                let draw = 0;

                let results = [];

                for (const ms of matchScores) {
                    if (ms.scoreTeam1 > ms.scoreTeam2) {
                        t1Win++;
                    } else if (ms.scoreTeam1 < ms.scoreTeam2) {
                        t2Win++;
                    } else {
                        draw++;
                    }
                    results.push({
                        id: `${id}-${ms.user.sys.id}`,
                        user: ms.user.fullName,
                        team1: ms.scoreTeam1,
                        team2: ms.scoreTeam2
                    })
                }

                matchBets[id] = results;

                const total = t1Win + t2Win + draw;
                const percent1 = total > 0? t1Win * 1.0/total * 100 : 0;
                const percent2 = total > 0? t2Win * 1.0/total * 100 : 0;
                const percentDraw = total > 0? draw * 1.0/total * 100 : 0;

                matchPercents[id] = {
                    t1Percent : percent1,
                    t2Percent : percent2,
                    drawPercent : percentDraw
                }
            });

            setCurrentBets(matchBets);

            setPercents(matchPercents);

            setPhaseName(phase.title)
        }

        return () => {
            //cleanup
        }
    }, [props.resultsData]);

    return (<AppLayout>
        {props.resultsData ? <Grid container>
            <Grid item xs={12} md={6}>
                <Typography variant="h4">
                    {phaseName}
                </Typography>
                <div>
                    {props.resultsData.matches.map(m => <Match 
                    bets={currentBets[m.sys.id]}
                    key={m.sys.id} match={m} percent={percents[m.sys.id]}></Match>)}
                </div>
                { }
            </Grid>
            <Grid item xs={12} md={6}>
                {!props.scoreBoardData?<p>loading...</p>:<List>
                    <ListItem><Typography variant="h5">Leader Board</Typography></ListItem>
                    {props.scoreBoardData.scores.map(score => <Score 
                        key={score.user.sys.id}
                        user={score.user} 
                        score={score.score}
                        winner={score.winner}
                        total={score.total}
                        ></Score>)}
                    </List>}
            </Grid>
        </Grid> :  <div>Loading...</div>}

    </AppLayout>)
}

Results.getInitialProps = async (ctx) => {
    const authResponse = await authSync(ctx);
    const config = {
        headers: {
          'Authorization': authResponse.Token
        }
      };
    
    const responses = await Promise.all([
        axios.get('https://pollazaapi.herokuapp.com/phase/results',config), 
        axios.get('https://pollazaapi.herokuapp.com/phase/ScoreBoard',config)]);

    //console.log(authResponse.Token, responses);

    return { resultsData : responses[0].data, scoreBoardData: responses[1].data }
}

export default Results
