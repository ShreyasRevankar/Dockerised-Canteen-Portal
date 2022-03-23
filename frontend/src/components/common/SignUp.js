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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();


function SignUpBuyer(props) {
    const [nameBool, setNameBool] = React.useState('');
    const [name, setName] = React.useState('');
    const [emailBool, setEmailBool] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [numberBool, setNumberBool] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [ageBool, setAgeBool] = React.useState(true);
    const [age, setAge] = React.useState('');
    const [batch, setBatch] = React.useState('');
    const [passwordBool, setPasswordBool] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleChange = (event) => {
        setBatch(event.target.value);
    };

    const handleEmailChange = (event) => {
        // console.log(event.target.value);
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(event.target.value)) {
            setEmailBool('');
            setEmail(event.target.value);
        } else {
            setEmailBool("Invalid Email");
            setEmail('');
        }
    }

    const handleNameChange = (event) => {
        if (event.target.value.length > 0) {
            setNameBool('');
            setName(event.target.value);
        } else {
            setNameBool("Name can't be empty");
            setName('');
        }
    }

    const handleNumberChange = (event) => {
        let re = /^[0-9]{10}$/;
        if (re.test(event.target.value)) {
            setNumberBool('');
            setNumber(event.target.value);
        } else {
            setNumberBool("Contact number should be 10 digits");
            setNumber('');
        }
    }

    const handleAgeChange = (event) => {
        if (event.target.value >= 18 && event.target.value <= 100) {
            setAgeBool(true);
            setAge(event.target.value);
        } else {
            setAgeBool(false);
            setAge('');
        }
    }

    const handlePasswordChange = (event) => {
        let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        if (re.test(event.target.value)) {
            setPasswordBool('');
            setPassword(event.target.value);
        } else {
            setPasswordBool("Password should be 8-20 characters long and should contain atleast one uppercase, one lowercase, one special character and one number");
            setPassword('');
        }
    }

    useEffect(() => {
        if (name === '' || email === '' || number === '' || age === '' || password === '' || batch === '') {
            props.setDisableButton(true);
        } else {
            props.setDisableButton(false);
        }
    },
        [nameBool, emailBool, numberBool, ageBool, passwordBool, batch]
    );


    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
                <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    onChange={handleNameChange}
                    error={!(nameBool === '')}
                    autoFocus
                />
                <div style={{ color: 'red' }}>{nameBool}</div>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    onChange={handleEmailChange}
                    error={!(emailBool === '')}
                    autoComplete="email"
                />
                <div style={{ color: 'red' }}>{emailBool}</div>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="number"
                    type="number"
                    required
                    fullWidth
                    id="number"
                    onChange={handleNumberChange}
                    error={!(numberBool === '')}
                    label="Contact Number"
                />
                <div style={{ color: 'red' }}>{numberBool}</div>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    name="age"
                    required
                    fullWidth
                    id="age"
                    label="Age"
                    type="number"
                    onChange={handleAgeChange}
                    error={!ageBool}
                />
                <div style={{ color: 'red' }}>{ageBool ? '' : "Age should be between 18 and 100"}</div>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl required fullWidth>
                    <InputLabel id="batch">Batch</InputLabel>
                    <Select
                        labelId="batch"
                        id="batch"
                        name="batch"
                        value={batch}
                        label="Batch *"
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>UG 1</MenuItem>
                        <MenuItem value={2}>UG 2</MenuItem>
                        <MenuItem value={3}>UG 3</MenuItem>
                        <MenuItem value={4}>UG 4</MenuItem>
                        <MenuItem value={5}>UG 5</MenuItem>
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={handlePasswordChange}
                    error={!(passwordBool === '')}
                />
                <div style={{ color: 'red' }}>{passwordBool}</div>
            </Grid>
        </Grid>

    );
}

function SignUpVendor(props) {
    // name, email, number, shop, time_open, time_close, password
    const [nameBool, setNameBool] = React.useState('');
    const [name, setName] = React.useState('');
    const [emailBool, setEmailBool] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [numberBool, setNumberBool] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [shopBool, setShopBool] = React.useState('');
    const [shop, setShop] = React.useState('');
    const [timeOpenBool, setTimeOpenBool] = React.useState('');
    const [timeOpen, setTimeOpen] = React.useState('');
    const [timeCloseBool, setTimeCloseBool] = React.useState('');
    const [timeClose, setTimeClose] = React.useState('');
    const [passwordBool, setPasswordBool] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleNameChange = (event) => {
        if (event.target.value.length > 0) {
            setNameBool('');
            setName(event.target.value);
        } else {
            setNameBool("Name can't be empty");
            setName('');
        }
    }

    const handleEmailChange = (event) => {
        // console.log(event.target.value);
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(event.target.value)) {
            setEmailBool('');
            setEmail(event.target.value);
        } else {
            setEmailBool("Invalid Email");
            setEmail('');
        }
    }

    const handleNumberChange = (event) => {
        let re = /^[0-9]{10}$/;
        if (re.test(event.target.value)) {
            setNumberBool('');
            setNumber(event.target.value);
        } else {
            setNumberBool("Contact number should be 10 digits");
            setNumber('');
        }
    }

    const handleShopChange = (event) => {
        if (event.target.value.length > 0) {
            setShopBool('');
            setShop(event.target.value);
        } else {
            setShopBool("Shop name can't be empty");
            setShop('');
        }
    }

    const handleTimeOpenChange = (event) => {
        setTimeOpenBool('');
        setTimeOpen(event.target.value);
    }

    const handleTimeCloseChange = (event) => {
        if (event.target.value < timeOpen) {
            setTimeCloseBool("Closing time should be later than opening time");
            setTimeClose(event.target.value);
        } else {
            setTimeCloseBool('');
            setTimeClose(event.target.value);
        }
    }


    const handlePasswordChange = (event) => {
        let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        if (re.test(event.target.value)) {
            setPasswordBool('');
            setPassword(event.target.value);
        } else {
            setPasswordBool("Password should be 8-20 characters long and should contain atleast one uppercase, one lowercase, one special character and one number");
            setPassword('');
        }
    }

    useEffect(() => {
        if (name === '' || email === '' || number === '' || shop === '' || password === '' || timeOpen === '' || timeClose === '' || timeCloseBool !== '') {
            console.log(timeCloseBool, timeClose);
            props.setDisableButton(true);
        } else {
            props.setDisableButton(false);
        }
    },
        [nameBool, emailBool, numberBool, shopBool, timeOpenBool, timeCloseBool, passwordBool, timeClose]
    );

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
                <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Manager's Name"
                    onChange={handleNameChange}
                    error={!(nameBool === '')}
                    autoFocus
                />
                <div style={{ color: 'red' }}>{nameBool}</div>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleEmailChange}
                    error={!(emailBool === '')}
                />
                <div style={{ color: 'red' }}>{emailBool}</div>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="number"
                    required
                    fullWidth
                    id="number"
                    type="number"
                    label="Contact Number"
                    onChange={handleNumberChange}
                    error={!(numberBool === '')}
                />
                <div style={{ color: 'red' }}>{numberBool}</div>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="shop"
                    required
                    fullWidth
                    id="shop"
                    label="Shop's Name"
                    onChange={handleShopChange}
                    error={!(shopBool === '')}
                />
                <div style={{ color: 'red' }}>{shopBool}</div>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="time_open"
                    label="Opening Time"
                    type="time"
                    name="time_open"
                    // defaultValue="07:30"
                    value={timeOpen}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    sx={{ width: 150 }}
                    onChange={handleTimeOpenChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="time_close"
                    label="Closing Time"
                    type="time"
                    name="time_close"
                    // defaultValue="17:30"
                    value={timeClose}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    sx={{ width: 150 }}
                    disabled={(timeOpen === '')}
                    onChange={handleTimeCloseChange}
                    error={timeClose < timeOpen}
                />
                <div style={{ color: 'red' }}>{timeCloseBool}</div>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={handlePasswordChange}
                    error={!(passwordBool === '')}
                />
                <div style={{ color: 'red' }}>{passwordBool}</div>
            </Grid>
        </Grid>

    );
}
function DisplayOption(props) {
    if (props.user_type === 'buyer') {
        return <SignUpBuyer setDisableButton={props.setDisableButton} />
    }
    else if (props.user_type === 'vendor') {
        return <SignUpVendor setDisableButton={props.setDisableButton} />
    } else {
        return <></>
    }
}

function SignUp() {


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        for (var value of data.values()) {
            console.log(value);
        }

        if (user_type === 'buyer') {
            const newBuyer = {
                name: data.get("name"),
                email: data.get("email"),
                contact_number: data.get("number"),
                password: data.get("password"),
                age: data.get("age"),
                batch: data.get("batch")
            };
            axios
                .post('/api/user/signUpBuyer', newBuyer)
                .then(res => {
                    if(res.data == "buyer" || res.data == "vendor") {
                        alert("Email already in use!");
                    } else {
                        alert("Sign Up Successful");
                        window.location.href = "/signin";
                    }
                    console.log(res.data);
                });
        } else if (user_type === 'vendor') {
            const newVendor = {
                name: data.get("name"),
                email: data.get("email"),
                contact_number: data.get("number"),
                password: data.get("password"),
                shop_name: data.get("shop"),
                opening_time: data.get("time_open"),
                closing_time: data.get("time_close")
            };
            axios
                .post('/api/user/signUpVendor', newVendor)
                .then(res => {
                    if(res.data == "buyer" || res.data == "vendor") {
                        alert("Email already in use!");
                    } else {
                        alert("Sign Up Successful");
                        window.location.href = "/signin";
                    }
                    console.log(res.data);
                });
        }

        // const newUser = {
        //     name: name,
        //     email: email,
        //     date: Date.now(),
        // };
        // axios
        //     .post("/api/user/register", newUser)
        //     .then((response) => {
        //         alert("Created\t" + response.data.name);
        //         console.log(response.data);
        //     });

        // resetInputs();
    };
    const [user_type, setType] = React.useState('');
    const [disableButton, setDisableButton] = React.useState(true);

    const handleChange = (event) => {
        setType(event.target.value);
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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <FormControl required fullWidth>
                                <InputLabel id="demo-simple-select-required-label">User Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    value={user_type}
                                    label="User type *"
                                    onChange={handleChange}
                                >
                                    <MenuItem disabled value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="buyer">Buyer</MenuItem>
                                    <MenuItem value="vendor">Vendor</MenuItem>
                                </Select>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>
                            <DisplayOption user_type={user_type} setDisableButton={setDisableButton} />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={disableButton}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="signin" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright></Copyright>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}


export default SignUp;
