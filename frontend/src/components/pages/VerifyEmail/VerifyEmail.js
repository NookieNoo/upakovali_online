import { useEffect } from 'react';
import {
    Avatar,
    CssBaseline,
    Card,
    Box,
    // LockOutlinedIcon,
    Typography,
    Container,
    createTheme,
    ThemeProvider,
} from '@material-ui/core';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import { makeStyles } from '@material-ui/core/styles';
import { Notification, TextInput, required } from 'react-admin';
import { useLocation, useHistory } from 'react-router-dom';
import { authProvider } from '@app-providers';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        height: '1px',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '100%',
        backgroundImage: 'radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)',
    },
    card: {
        minWidth: 500,
        marginTop: '6em',
        padding: theme.spacing(2),
    },
    avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {
        backgroundColor: theme.palette.secondary[500],
    },
}));

const VerifyEmail = (props) => {
    const classes = useStyles();
    const { search } = useLocation();
    const history = useHistory();
    const query = new URLSearchParams(search);
    const verify_url = query.get('verify_url');

    useEffect(() => {
        authProvider.verifyEmail(verify_url).then((res) => {
            const { alreadyVerified } = res.json.data;
            history.push('/login', { alreadyVerified, showHint: true });
        }).catch();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" className={classes.main} maxWidth={false}>
                <CssBaseline />
                <Notification />
                <Card maxWidth="xs" className={classes.card}>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <AcUnitIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Сбросить пароль
                        </Typography>
                    </Box>
                </Card>
            </Container>
        </ThemeProvider>
    );
};

export { VerifyEmail };
