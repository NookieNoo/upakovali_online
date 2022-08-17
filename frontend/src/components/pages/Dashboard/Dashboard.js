import * as React from 'react';
import { MapWithOrders } from './blocks';
import { OrdersList } from './blocks';
import { Card, CardHeader, CardContent, Grid, Box, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { ShowSplitter } from '@app-universal';
import { useGetIdentity } from 'react-admin';
import { userRoles } from '@app-constants';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
        gridContainer: {
            marginTop: '10px'
        },
        styleMap: {
            marginTop: '10px'
        }
    })
);

export const Dashboard = (props) => {
    const { identity } = useGetIdentity();
    const isCourier = identity?.role.id === userRoles.courier.id;
    const isAdmin = identity?.role.id === userRoles.admin.id;
    const classes = useStyles();

    return (
        <div {...props}>
            <ShowSplitter
                leftSide={
                    <div className={classes.gridContainer}>
                    <Grid container spacing={2}>
                        <Container>
                            {!isCourier && (
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={6} xl={6} xs={6}>
                                        <Card>
                                            <CardHeader title="Найти" />
                                            <CardContent>
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                    component={Link}
                                                    to={{ pathname: '/user' }}
                                                >
                                                    Пользователя
                                                </Button>
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                    component={Link}
                                                    to={{ pathname: '/parthner' }}
                                                >
                                                    Партнера
                                                </Button>
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                    component={Link}
                                                    to={{ pathname: '/client' }}
                                                >
                                                    Клиента
                                                </Button>
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                    component={Link}
                                                    to={{ pathname: '/order' }}
                                                >
                                                    Заказ
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item lg={6} md={6} xl={6} xs={6}>
                                        <Card>
                                            <CardHeader title="Создать" />
                                            <CardContent>
                                                {isAdmin && (
                                                    <>
                                                        <Button
                                                            size="small"
                                                            color="primary"
                                                            component={Link}
                                                            to={{ pathname: '/user/create' }}
                                                        >
                                                            Пользователя
                                                        </Button>
                                                        <Button
                                                            size="small"
                                                            color="primary"
                                                            component={Link}
                                                            to={{ pathname: '/parthner/create' }}
                                                        >
                                                            Партнера
                                                        </Button>
                                                        <Button
                                                            size="small"
                                                            color="primary"
                                                            component={Link}
                                                            to={{ pathname: '/client/create' }}
                                                        >
                                                            Клиента
                                                        </Button>
                                                    </>
                                                )}
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                    component={Link}
                                                    to={{ pathname: '/order/create' }}
                                                >
                                                    Заказ
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            )}
                            <div className={classes.styleMap}>
                                <MapWithOrders />
                            </div>
                        </Container>
                    </Grid>
                </div>
                }
                leftSideProps={{ lg: 6, md: 6, xl: 6, xs: 12, component: Box }}
                rightSideProps={{ lg: 6, md: 6, xl: 6, xs: 12 }}
                rightSide={<OrdersList />}
            />
        </div>
    );
};
