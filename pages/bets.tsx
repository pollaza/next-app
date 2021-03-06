import React, { useEffect, useState } from "react";

import Bet from "../src/components/bets/Bet";
import AppLayout from "../components/AppLayout";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { _useAxios, authSync } from "../services";
import axios from 'axios';

const Bets = (props) => {
    // const [{ data, loading }, executeGetBets] = _useAxios(
    //     { url: '/bet', method: 'GET' },
    //     { manual: true }
    // )

    const [{data:dataSave,loading:loadingSave}, executeSaveBets] = _useAxios(
        { url: '/bet', method: 'POST' },
        { manual: true }
    )
    

    const [currentScoresTeam1,setCurrentScoresTeam1] = useState([]);
    const [currentScoresTeam2,setCurrentScoresTeam2] = useState([]);

    useEffect(() => {
        //executeGetBets();
        return () => {

        }
    }, [])

    useEffect(() => {
        if (props.betsData) {
            setCurrentScoresTeam1(props.betsData.scoresTeam1);
            setCurrentScoresTeam2(props.betsData.scoresTeam2);
        }

    }, [props.betsData])

    const handleSaveBets = () => {
        let matchId = [];
        let scoresTeam1 = [];
        let scoresTeam2 = [];

        props.betsData.matches.forEach((m,index) => {
            if(!m.closed){
                matchId.push(m.sys.id);
                scoresTeam1.push(currentScoresTeam1[index]);
                scoresTeam2.push(currentScoresTeam2[index]);
            }
        });

        if(matchId.length > 0){
            executeSaveBets({data: {matchId, scoresTeam1,scoresTeam2}});
        }
    }

    const handleChangeTeam1 = (index, value) => {
        let t1 = currentScoresTeam1.slice();
        t1[index] = value;

        setCurrentScoresTeam1(t1);
    }

    const handleChangeTeam2 = (index, value) => {
        let t2 = currentScoresTeam2.slice();
        t2[index] = value;

        setCurrentScoresTeam2(t2);
    }

    return (
        <AppLayout>
            <Typography variant="h4">
                Bets:
            </Typography>
            {props.betsData ? <Grid container>
                {
                    props.betsData.matches.map((m, index) => {
                        return (
                            <Grid key={m.sys.id} item xs={12} sm={6} md={4} lg={3}>
                                <Bet match={m} 
                                index={index}
                                changeTeam1={handleChangeTeam1}
                                changeTeam2={handleChangeTeam2}
                                team1={props.betsData.scoresTeam1[index]} 
                                team2={props.betsData.scoresTeam2[index]} />
                            </Grid>)
                    })}
            </Grid> : <p>loading...</p>}
            {!loadingSave ? <Button onClick={handleSaveBets} variant="contained" color="primary">Save Bets</Button> : <></>}
        </AppLayout>

    )
}

Bets.getInitialProps = async (ctx) => {
    const authResponse = await authSync(ctx);
    const config = {
        headers: {
          'Authorization': authResponse.Token
        }
      };

    const response = await axios.get('https://pollazaapi.herokuapp.com/bet',config);


    //console.log(authResponse.Token, responses);

    return { betsData : response.data }
}

export default Bets;