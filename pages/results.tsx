import React, { useEffect, useState } from 'react'

import AppLayout from "../components/AppLayout";

import Match from "../src/components/results/Match"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography";
import useAxios from "axios-hooks";


const Results = (props) => {

    const [phaseName, setPhaseName] = useState("");
    const [matches, setMatches] = useState([]);
    const [{ data, loading }, executeGetPhase] = useAxios(
        { url: 'https://pollazaapi.herokuapp.com/phase', method: 'GET' },
        { manual: true }
    )

    useEffect(() => {
        executeGetPhase();
        return () => {

        }
    }, [])


    useEffect(() => {
        // console.log(props);
        // setPhaseName(props.phaseData.phase.title);
        // const matchesInfo = props.phaseData.matches.map(m=>{

        //     let date = new Date(Date.parse(m.date));
        //     let dateInUTC = date.setHours(date.getHours() + 5);

        //     return {
        //         id: m.sys.id,
        //         date: dateInUTC,
        //         team1: m.team1,
        //         team2: m.team2,
        //         team1Score: m.team1Score,
        //         team2Score: m.team2Score,
        //         closes: m.closed,
        //         finished: m.finished,
        //         inProgress: m.inProgress
        //     }
        // })
        // setMatches(matchesInfo)

        return () => {
            //cleanup
        }
    }, [props])

    return (<AppLayout>
        <Grid container>
            <Grid item xs={12} md={6}>
                <Typography variant="h1">
                    {phaseName}
                </Typography>
                <div>
                    {matches.map(m => <Match key={m.id} match={m}></Match>)}
                </div>
                { }
            </Grid>
            <Grid item xs={12} md={6}>
                Result List
            </Grid>
        </Grid>
    </AppLayout>)
}

// Results.getInitialProps = async (ctx) => {
//     const res = await axios.get('https://pollazatechtalk.azurewebsites.net/Phase')
//     const phase = res.data;
//     return { phaseData: phase }
//   }

export default Results
