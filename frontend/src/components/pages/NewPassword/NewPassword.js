import * as React from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Card,
    Box,
    // LockOutlinedIcon,
    Typography,
    Container,
    createTheme,
    ThemeProvider,
} from '@material-ui/core';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@material-ui/icons-material/LockOutlinedIcon';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import { makeStyles } from '@material-ui/core/styles';
import { authProvider } from '@app-providers';

// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRedirect, useLogin, useNotify, useSafeSetState } from 'ra-core';
import { Notification, TextInput, required } from 'react-admin';
import { Field, Form } from 'react-final-form';
import { newPasswordFormValidators } from '@app-helpers';
import { useHistory } from 'react-router-dom';

const theme = createTheme();

const Input = ({
    meta: { touched, error }, // eslint-disable-line react/prop-types
    input: inputProps, // eslint-disable-line react/prop-types
    validateField,
    ...props
}) => {
    return (
        <TextInput
            error={!!(touched && error)}
            helperText={touched && error}
            {...inputProps}
            {...props}
            fullWidth
            validate={newPasswordFormValidators[validateField]}
        />
    );
};

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

const NewPassword = (props) => {
    const classes = useStyles();
    const notify = useNotify();
    let history = useHistory();

    const url = new URL(window.location.href);
    const email = url.searchParams.get('email');
    const token = url.searchParams.get('token');

    const initialValues = { email, token };

    const handleSubmit = (values) => {
        authProvider
            .resetPassword(values)
            .then((res) => {
                notify(res?.message || 'Пароль успешно сброшен', { type: 'success' });
                setTimeout(() => history.push("/login"), 1000);
            })
            .catch((error) => {
                notify(error?.message || 'Пожалуйста, попробуйте позже', { type: 'error' });
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" className={classes.main} maxWidth={false}>
                <CssBaseline />
                <Notification />
                <Card className={classes.card}>
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
                            Новый пароль
                        </Typography>
                        <Form
                            onSubmit={handleSubmit}
                            validate={newPasswordFormValidators.submit}
                            initialValues={initialValues}
                            render={({ handleSubmit }) => (
                                <form onSubmit={handleSubmit} noValidate>
                                    <Field
                                        component={Input}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email1"
                                        name="email"
                                        autoComplete="email"
                                        disabled
                                    />
                                    <Field
                                        component={Input}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="password"
                                        type="password"
                                        label="Пароль"
                                        name="password"
                                        autoComplete="password"
                                        validateField="password"
                                    />
                                    <Field
                                        component={Input}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        type="password"
                                        label="Подтвердите пароль"
                                        name="password_confirmation"
                                        autoComplete="password"
                                        validateField="password_confirmation"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        color="primary"
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Сбросить
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="/login" variant="body2">
                                                Вспомнили пароль?
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </form>
                            )}
                        />
                    </Box>
                </Card>
            </Container>
        </ThemeProvider>
    );
};

export { NewPassword };
