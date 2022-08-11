import * as React from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
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
import { useTranslate, useLogin, useNotify, useSafeSetState } from 'ra-core';
import { Notification, TextInput, required } from 'react-admin';
import { Field, Form } from 'react-final-form';
import { passwordRestoreFormValidators } from '@app-helpers';
import { Link } from "react-router-dom";
import LinkUI from '@material-ui/core/Link';

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
            validate={passwordRestoreFormValidators[validateField]}
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
    }
}));

const PasswordRestore = (props) => {
    const classes = useStyles();
    const notify = useNotify();

    const handleSubmit = (values) => {
        console.log(values);
        authProvider
            .forgotPassword(values)
            .then((res) =>
                notify(res?.message || 'Ссылка на восстановление пароля успешно отправлена', { type: 'success' })
            )
            .catch((error) => {
                notify(error?.message || 'Пожалуйста, попробуйте позже', { type: 'error' });
            });
    };

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
                        <Form
                            onSubmit={handleSubmit}
                            render={({ handleSubmit }) => (
                                <form onSubmit={handleSubmit} noValidate>
                                    <Field
                                        component={Input}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        validateField="email"
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
                                            <LinkUI variant="body2">
                                                <Link to="/login">
                                                    Вспомнили пароль?
                                                </Link>
                                            </LinkUI>
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

export { PasswordRestore };
