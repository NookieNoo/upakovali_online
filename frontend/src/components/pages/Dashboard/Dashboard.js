import * as React from "react";
import { MapWithOrders } from "./blocks";
import { OrdersList } from "./blocks";
import {
    Card,
    CardHeader,
    CardContent,
    Grid,
    useMediaQuery,
} from "@material-ui/core";

const Spacer = () => <span style={{ width: "1em" }} />;

export const Dashboard = () => {
    const isXSmall = useMediaQuery((theme) => theme.breakpoints.down("xs"));
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("md"));
    console.log('isXSmall', isXSmall);
    console.log('isSmall', isSmall);
    return isXSmall ? (
        <Grid container>
            <Grid item xs={12}>
                <Card style={{ width: "100%" }}>
                    <CardHeader title="Welcome to the administration" />
                    <CardContent>Lorem ipsum sic dolor amet...</CardContent>
                </Card>
            </Grid>

            <Grid item xs={12}>
                <Card style={{ width: "100%" }}>
                    <CardHeader title="Welcome to the administration" />
                    <CardContent>Lorem ipsum sic dolor amet...</CardContent>
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
                <Card style={{ width: "100%" }}>
                    <CardHeader title="Welcome to the administration" />
                    <CardContent>Lorem ipsum sic dolor amet...</CardContent>
                </Card>
            </Grid>

            <Grid item md={6}>
                <Card style={{ width: "100%" }}>
                    <CardHeader title="Welcome to the administration" />
                    <CardContent>Lorem ipsum sic dolor amet...</CardContent>
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
                            <CardHeader title="Welcome to the administration" />
                            <CardContent>
                                Lorem ipsum sic dolor amet...
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={6}>
                        <Card>
                            <CardHeader title="Welcome to the administration" />
                            <CardContent>
                                Lorem ipsum sic dolor amet...
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
