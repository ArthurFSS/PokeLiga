import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Typography, makeStyles, AppBar, Tabs, Tab, Box, Paper } from '@material-ui/core';
import { useNavigate, useOutletContext } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(0),
    },
    header: {
        marginBottom: theme.spacing(2),
    },
    logoutButton: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1, 3),
        backgroundColor: '#1976d2',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#115293',
        },
    },
    tabContent: {
        padding: theme.spacing(2),
    },
}));

const Profile = ({ token, handleLogout }) => {
    const classes = useStyles();
    const [userData, setUserData] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const navigate = useNavigate();
    const { user } = useOutletContext();

    useEffect(() => {
        setUserData(user);
        // Simulated API calls - replace with actual API calls
        // fetchUserData(user.email);
        // fetchLastMatches(user.email);
        // fetchLeagueHistory(user.email);
    }, [user]);

    const handleUserLogout = () => {
        handleLogout();
        navigate('/login');
    };

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };

    // Simulated API calls - replace with actual API calls
    const fetchUserData = async (email) => {
        try {
            // const response = await axios.get(`http://localhost:5010/user/data?email=${email}`);
            // setUserData(response.data);
            // console.log('User Data:', response.data);
            setUserData({
                name: "John Doe",
                email: email,
                victories: 10,
                defeats: 5,
                draws: 3
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchLastMatches = async (email) => {
        try {
            // const response = await axios.get(`http://localhost:5010/user/lastmatches?email=${email}`);
            // setLastMatches(response.data);
            // console.log('Last Matches:', response.data);
            setLastMatches([
                { opponent: "Opponent A", round: 5, victory: true },
                { opponent: "Opponent B", round: 4, victory: false },
                { opponent: "Opponent C", round: 3, victory: true },
            ]);
        } catch (error) {
            console.error('Error fetching last matches:', error);
        }
    };

    const fetchLeagueHistory = async (email) => {
        try {
            // const response = await axios.get(`http://localhost:5010/user/leaguehistory?email=${email}`);
            // setLeagueHistory(response.data);
            // console.log('League History:', response.data);
            setLeagueHistory([
                { league: "League 1", placement: 2 },
                { league: "League 2", placement: 1 },
                { league: "League 3", placement: 3 },
            ]);
        } catch (error) {
            console.error('Error fetching league history:', error);
        }
    };

    const TabPanel = (props) => {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    };

    return (
        <div className={classes.container}>
            {/* {userData && (
                <Typography variant="h5" className={classes.header}>Bem vindo, {userData.name}</Typography>
            )} */}
            <AppBar position="static">
                <Tabs value={tabValue} onChange={handleChangeTab} aria-label="profile tabs">
                    <Tab label="Resumo" />
                    <Tab label="Últimas Partidas" />
                    <Tab label="Histórico" />
                </Tabs>
            </AppBar>
            <Paper className={classes.tabContent}>
                <TabPanel value={tabValue} index={0}>
                    {userData && (
                        <div>
                            <Typography variant="h6">Vitórias: {userData.victories}</Typography>
                            <Typography variant="h6">Derrotas: {userData.defeats}</Typography>
                            <Typography variant="h6">Empates: {userData.draws}</Typography>
                        </div>
                    )}
                    <Button className={classes.logoutButton} onClick={handleUserLogout}>Logout</Button>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    {/* Implementar lista de últimas partidas aqui */}
                    {/* Exemplo de dados */}
                    <Typography variant="h6">Últimas Partidas:</Typography>
                    <ul>
                        <li>Opponent A - Rodada 5 - <span style={{ color: 'green' }}>Vitória</span></li>
                        <li>Opponent B - Rodada 4 - <span style={{ color: 'red' }}>Derrota</span></li>
                        <li>Opponent C - Rodada 3 - <span style={{ color: 'green' }}>Vitória</span></li>
                    </ul>
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    {/* Implementar histórico de ligas aqui */}
                    {/* Exemplo de dados */}
                    <Typography variant="h6">Histórico de Ligas:</Typography>
                    <ul>
                        <li>League 1 - Colocação: 2</li>
                        <li>League 2 - Colocação: 1</li>
                        <li>League 3 - Colocação: 3</li>
                    </ul>
                </TabPanel>
            </Paper>
        </div>
    );
};

export default Profile;
