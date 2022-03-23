import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import axios from "axios";
// import TimePicker from 'react-time-picker';
import InputAdornment from '@mui/material/InputAdornment';


const theme = createTheme();

function Wallet(props) {
    const [wallet, setWallet] = useState('');
    const [disableButton, setDisableButton] = useState(true);

    useEffect(() => {
        setDisableButton(true);
        const user = {
            email: localStorage.getItem("user_email")
        };
        console.log(user);
        axios
            .post("/api/profile/buyer", user) 
            .then((response) => {
                console.log(response);
                // setDetails(response.data);
                console.log(response.data);
                setWallet(response.data.money);
                // setCallme(true);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            id: localStorage.getItem("user_id"),
            money: document.getElementById("amount").value
        };
        if(user.money <= 0 || user.money === '') {
            alert("Please enter a valid amount");
        } else {
            axios
                .post("/api/profile/buyer_update_money", user)
                .then((response) => {
                    console.log(response);
                    // setDetails(response.data);
                    console.log(response.data);
                    setWallet(response.data.money);
                    // setCallme(true);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AccountBalanceWalletIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Wallet
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                Balance: {wallet}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    // autoComplete="given-name"
                                    name="amount"
                                    // required
                                    fullWidth
                                    id="amount"
                                    label="Amount"
                                    size="small"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                    }}
                                    // defaultValue={wallet}
                                    // InputLabelProps={{
                                    //     shrink: true,
                                    //     // readOnly: true,
                                    // }}
                                    // InputProps={{
                                    //     readOnly: true,
                                    // }}
                                    // key={`${Math.floor((Math.random() * 1000))}-min`}
                                // onChange={handleNameChange}
                                // error={!(nameBool === '')}
                                // autoFocus
                                />
                                {/* <div style={{ color: 'red' }}>{nameBool}</div> */}
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Add Money
                            </Button>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}


export default Wallet;