import * as React from 'react';
import {
    NumberField,
    TextField,
    DateField,
    useTranslate,
    useGetList,
    Record,
    RecordMap,
    Identifier,
    ReferenceField,
    useLocale,
} from 'react-admin';
import { Typography, Card, CardContent, Box, Link, Stepper, Step, StepLabel, StepContent } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { makeStyles } from '@material-ui/core/styles';
import MessageIcon from '@material-ui/icons/Message';

let history = [
    {
        id: 1,
        data: '',
        who: 'Clement Russel',
        status: 'Создан',
    },
    {
        id: 2,
        data: '',
        who: 'Garrick Wiegand',
        status: 'Курьер назначен',
    },
    {
        id: 3,
        data: '',
        who: 'Clement Russel',
        status: 'Забрали',
    },
];

export default function Aside(props) {
    return (
        <>
            <Box m="0 0 1em 1em">
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            История
                        </Typography>
                        <Box display="flex">
                            <Box flexGrow={1}>
                                <Box display="flex" mb="1em">
                                    <Box mr="1em">
                                        <AccessTimeIcon fontSize="small" color="disabled" />
                                    </Box>
                                    <Box flexGrow={1}>
                                        <Typography>Создан</Typography>
                                        <Typography>02/08/2021</Typography>
                                        {/* <DateField record={record} source="first_seen" /> */}
                                    </Box>
                                </Box>
                            </Box>
                            <Box flexGrow={1}>
                                <Box display="flex" mb="1em">
                                    <Box mr="1em">
                                        <AccessTimeIcon fontSize="small" color="disabled" />
                                    </Box>
                                    <Box flexGrow={1}>
                                        <Typography>Последнее изменение</Typography>
                                        <Typography>02/08/2021</Typography>
                                        {/* <DateField record={record} source="last_seen" /> */}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
                <Stepper orientation="vertical">
                    {history.map((it, index) => (
                        <Step key={it.id} expanded active completed>
                            <StepLabel
                                StepIconComponent={() => {
                                    return <MessageIcon fontSize="small" color="disabled" style={{ paddingLeft: 3 }} />;
                                }}
                            >
                                Monday, Aug 30, 2021, 12:26 AM
                            </StepLabel>
                            <StepContent>
                                <Typography variant="body2" gutterBottom>
                                    <Link to={`/commands/`}>{it.status}</Link>
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {it.who}
                                </Typography>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </>
    );
}
