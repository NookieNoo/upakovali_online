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
import AcUnitIcon from '@material-ui/icons/AcUnit';
import { makeStyles } from '@material-ui/core/styles';
import { Field, Form } from 'react-final-form';
import { authProvider } from '@app-providers';
import { useTranslate, useLogin, useNotify, useSafeSetState } from 'ra-core';
import { Notification, TextInput, required } from 'react-admin';
import { registerFormValidators } from '@app-helpers';
import { userRoles } from '@app-constants';
import PhoneMaskedInput from 'components/universal/inputs/PhoneMaskedInput';
import { useRedirect } from 'ra-core';

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
            validate={registerFormValidators[validateField]}
        />
    );
};

const RegistrationPage = (props) => {
    const classes = useStyles();
    const notify = useNotify();

    const redirect = useRedirect();

    const submit = (values) => {
        console.log(values);
        authProvider
            .register(values)
            .then((res) => {
                notify(res?.message || 'Пользователь зарегистрирован', { type: 'success' });
                setTimeout(() => redirect('/login'), 2000);
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
                            Регистрация
                        </Typography>
                        <Form
                            onSubmit={submit}
                            validate={registerFormValidators.submit}
                            render={({ handleSubmit }) => (
                                <form onSubmit={handleSubmit} noValidate>
                                    <Field
                                        component={Input}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="full_name"
                                        label="ФИО"
                                        name="full_name"
                                        autoComplete="full_name"
                                        autoFocus
                                        validateField="full_name"
                                    />
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
                                    <Field
                                        component={Input}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Телефон"
                                        name="phone"
                                        autoComplete="phone"
                                        validateField="phone"
                                        options={{
                                            InputProps: {
                                                inputComponent: PhoneMaskedInput,
                                            },
                                        }}
                                    />
                                    <Field
                                        component={Input}
                                        margin="normal"
                                        type="password"
                                        required
                                        fullWidth
                                        id="password"
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
                                        type="password"
                                        id="password_confirmation"
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
                                        Зарегистрироваться
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="/login" variant="body2">
                                                Уже есть аккаунт?
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

export { RegistrationPage };
