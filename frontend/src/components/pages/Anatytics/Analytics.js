import * as React from 'react';
import { Paper } from '@material-ui/core';
import { VictoryChart, VictoryArea, VictoryAxis } from 'victory';
import { List, Datagrid, TextField, BooleanField, ChipField, EditButton, useGetIdentity } from 'react-admin';

const sampleData = [
    {
        x: 1,
        y: 2,
    },
    {
        x: 3,
        y: 4,
    },
    {
        x: 5,
        y: 2,
    }
]

export const Analytics = (props) => {
    return (
        // <Paper>
        //     sdf
        //     <VictoryChart>
        //         <VictoryArea data={sampleData} />
        //         <VictoryAxis />
        //     </VictoryChart>
        // </Paper>
        <List basePath='/orders'>
            <div>
                sdf
            </div>
        </List>
    );
};
