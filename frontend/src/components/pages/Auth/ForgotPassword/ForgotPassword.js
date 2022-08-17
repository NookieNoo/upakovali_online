import { useState } from 'react';
import { useLogin, useNotify, Notification, defaultTheme } from 'react-admin';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Login } from 'react-admin';
import { Link } from 'react-router-dom';
import LinkUI from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(4, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const ForgotPassword = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();
    const submit = (e) => {
        e.preventDefault();
        login({ username: email, password }).catch((e) => {
            notify('Invalid email or password');
            console.log('Invalid email or password');
        });
    };

    return (
        <Login>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Войти
                </Typography>
                <form className={classes.form} onSubmit={submit} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Электронная почта"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Войти
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <div className={classes.link}>
                                <Link to="/auth/password-restore">Забыли пароль?</Link>
                            </div>
                        </Grid>
                        <Grid item>
                            <Link to="/auth/registration">
                                <LinkUI variant="body2">Нет1sfsdfsdfsdfsd учетной записи?</LinkUI>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Login>
    );
};

export { ForgotPassword };
