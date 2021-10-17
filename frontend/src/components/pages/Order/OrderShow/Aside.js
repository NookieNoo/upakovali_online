import * as React from 'react';
import { Typography, Card, CardContent, Box, Link, Stepper, Step, StepLabel, StepContent } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MessageIcon from '@material-ui/icons/Message';
import { last } from 'lodash';

export default function Aside(props) {
    const { history } = props;
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
                                        <Typography>{history && history[0].date}</Typography>
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
                                        <Typography>{history && last(history).date}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
                <Card>
                    <Stepper orientation="vertical">
                        {history &&
                            history.map((it, index) => (
                                <Step key={it.id} expanded active completed>
                                    <StepLabel
                                        StepIconComponent={() => {
                                            return (
                                                <MessageIcon
                                                    fontSize="small"
                                                    color="disabled"
                                                    style={{ paddingLeft: 3 }}
                                                />
                                            );
                                        }}
                                    >
                                        {it.date}
                                    </StepLabel>
                                    <StepContent>
                                        <Typography variant="body2" gutterBottom>
                                            <Link to={`/commands/`}>{it.status.name}</Link>
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {it.user.full_name} ({it.user.role.name})
                                        </Typography>
                                    </StepContent>
                                </Step>
                            ))}
                    </Stepper>
                </Card>
            </Box>
        </>
    );
}
