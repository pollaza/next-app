import React from 'react'
import Match from "../src/components/results/Match"
import Grid from "@material-ui/core/Grid"

const Results = () => {
    return (<div>
        <Grid container>
            <Grid item xs={12} md={6}>
                <Match></Match>
                <Match></Match>
                <Match></Match>
                <Match></Match>
            </Grid>
            <Grid item xs={12} md={6}>
                Result List
            </Grid>
        </Grid>
    </div>)
}


export default Results
