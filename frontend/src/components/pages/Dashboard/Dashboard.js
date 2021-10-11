import * as React from 'react';
import { MapWithOrders } from './blocks';
import { OrdersList } from './blocks';
import { Card, CardHeader, CardContent, Grid, useMediaQuery } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

export const Dashboard = () => {
    const isXSmall = useMediaQuery((theme) => theme.breakpoints.down('xs'));
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'));
    console.log('isXSmall', isXSmall);
    console.log('isSmall', isSmall);
    return isXSmall ? (
        <Grid container>
            <Grid item xs={12}>
                <Card style={{ width: '100%' }}>
                    <CardHeader title="Найти" />
                    <CardContent>
                        <Button size="small" color="primary" component={Link} to={{ pathname: '/user' }}>
                            Пользователя
                        </Button>
                        <Button size="small" color="primary" component={Link} to={{ pathname: '/parthner' }}>
                            Партнера
                        </Button>
                        <Button size="small" color="primary" component={Link} to={{ pathname: '/client' }}>
                            Клиента
                        </Button>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12}>
                <Card style={{ width: '100%' }}>
                    <CardHeader title="Создать" />
                    <CardContent>
                        <Button size="small" color="primary" component={Link} to={{ pathname: '/user/create' }}>
                            Пользователя
                        </Button>
                        <Button size="small" color="primary" component={Link} to={{ pathname: '/parthner/create' }}>
                            Партнера
                        </Button>
                        <Button size="small" color="primary" component={Link} to={{ pathname: '/client/create' }}>
                            Клиента
                        </Button>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <MapWithOrders />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <OrdersList />
            </Grid>
        </Grid>
    ) : isSmall ? (
        <Grid container>
            <Grid item md={6}>
                <Card style={{ width: '100%' }}>
                    <CardHeader title="Найти" />
                    <CardContent>
                        <Button size="small" color="primary" component={Link} to={{ pathname: '/user' }}>
                            Пользователя
                        </Button>
                        <Button size="small" color="primary" component={Link} to={{ pathname: '/parthner' }}>
                            Партнера
                        </Button>
                        <Button size="small" color="primary" component={Link} to={{ pathname: '/client' }}>
                            Клиента
                        </Button>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item md={6}>
                <Card style={{ width: '100%' }}>
                    <CardHeader title="Создать" />
                    <CardContent>
                        <Button size="small" color="primary" component={Link} to={{ pathname: '/user/create' }}>
                            Пользователя
                        </Button>
                        <Button size="small" color="primary" component={Link} to={{ pathname: '/parthner/create' }}>
                            Партнера
                        </Button>
                        <Button size="small" color="primary" component={Link} to={{ pathname: '/client/create' }}>
                            Клиента
                        </Button>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item md={12}>
                <MapWithOrders />
            </Grid>
            <Grid item md={12}>
                <OrdersList />
            </Grid>
        </Grid>
    ) : (
        <Grid container>
            <Grid item md={6}>
                <Grid container>
                    <Grid item md={6}>
                        <Card>
                            <CardHeader title="Найти" />
                            <CardContent>
                                <Button size="small" color="primary" component={Link} to={{ pathname: '/user' }}>
                                    Пользователя
                                </Button>
                                <Button size="small" color="primary" component={Link} to={{ pathname: '/parthner' }}>
                                    Партнера
                                </Button>
                                <Button size="small" color="primary" component={Link} to={{ pathname: '/client' }}>
                                    Клиента
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={6}>
                        <Card>
                            <CardHeader title="Создать" />
                            <CardContent>
                                <Button size="small" color="primary" component={Link} to={{ pathname: '/user/create' }}>
                                    Пользователя
                                </Button>
                                <Button size="small" color="primary" component={Link} to={{ pathname: '/parthner/create' }}>
                                    Партнера
                                </Button>
                                <Button size="small" color="primary" component={Link} to={{ pathname: '/client/create' }}>
                                    Клиента
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <MapWithOrders />
            </Grid>
            <Grid item md={6}>
                <OrdersList />
            </Grid>
        </Grid>
    );
};
