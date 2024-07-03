import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Button, Typography, makeStyles, TextField, Grid } from '@material-ui/core';

const clientId = "646961153048-87jqtp39jd477cuah8tiq29ajmkmet52.apps.googleusercontent.com";
const url = 'http://localhost:5010/';

const useStyles = makeStyles(theme => ({
    loginContainer: {
        textAlign: 'center',
    },
    userContainer: {
        marginTop: theme.spacing(4),
    },
    logoutButton: {
        margin: theme.spacing(2),
        padding: theme.spacing(1, 3),
        backgroundColor: '#1976d2',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#115293',
        },
    },
    additionalFields: {
        marginTop: theme.spacing(2),
    },
}));

const Login = () => {
    const classes = useStyles();

    const [user, setUser] = useState(null);
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);
    const [birthDate, setBirthDate] = useState('');
    const [idPokemon, setIdPokemon] = useState('');
	const [token, setToken] = useState('');

    const onSuccess = (response) => {
        handleLogin(response.credential);
		setToken(response.credential);
        const decoded = jwtDecode(response.credential);
        console.log('Login Success:', decoded);
        setUser(decoded);
    };

    const onFailure = (error) => {
        console.log('Login Failed:', error);
    };

    const handleLogout = () => {
        googleLogout();
        setUser(null);
        setShowAdditionalFields(false);
    };

    const handleLogin = async (token) => {
        try {
            const response = await axios.post(url + 'user/login', { token });
            console.log('API Response:', response);
            if (response.status === 204) {
                setShowAdditionalFields(true);
            } else if (response.status === 200) {
                setShowAdditionalFields(false);
            }
        } catch (error) {
            console.error('Error sending data to API:', error);
        }
    };

    const handleCompleteRegistration = async () => {
        try {
            const response = await axios.post(url + 'user/create', {
                birthDate,
                idPokemon,
				token,
            });
            console.log('Registration Completed:', response.data);
            setShowAdditionalFields(false);
        } catch (error) {
            console.error('Error completing registration:', error);
        }
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className={classes.loginContainer}>
                {user ? (
                    <div className={classes.userContainer}>
                        <Typography variant="h5">Welcome, {user.name}</Typography>
                        <Button className={classes.logoutButton} variant="contained" onClick={handleLogout}>Logout</Button>
                    </div>
                ) : (
                    <Grid container justify="center">
                        <Grid item>
                            <GoogleLogin
                                onSuccess={onSuccess}
                                onError={onFailure}
                                cookiePolicy="single_host_origin"
                            />
                        </Grid>
                    </Grid>
                )}
                {showAdditionalFields && (
                    <Grid container justify="center" className={classes.additionalFields}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">Data de Nascimento:</Typography>
                            <TextField
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">ID Pokemon:</Typography>
                            <TextField
                                type="number"
                                value={idPokemon}
                                onChange={(e) => setIdPokemon(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: 16 }}>
                            <Button variant="contained" color="primary" onClick={handleCompleteRegistration}>Complete Registration</Button>
                        </Grid>
                    </Grid>
                )}
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
