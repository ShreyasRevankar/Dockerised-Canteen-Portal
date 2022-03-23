import axios from "axios";
import { useState, useEffect } from "react";
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
import InputAdornment from '@mui/material/InputAdornment';
// import { set } from "mongoose";


const theme = createTheme();

function VendorProfile(props) {
    const [details, setDetails] = useState([]);
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
    // const [disableButton, setDisableButton] = useState(true);
    const [read, setRead] = useState(true);

    useEffect(() => {
        setDetails(props.details);
        setName(props.details.name);
        setEmail(props.details.email);
        setNumber(props.details.contact_number);
        setShop(props.details.shop_name);
        setTimeOpen(props.details.opening_time);
        setTimeClose(props.details.closing_time);
        // setDisableButton(false);
        setRead(true);
    }, [props.details]);
    console.log(details, props.details);

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            name: document.getElementById("name").value,
            contact_number: document.getElementById("number").value,
            // shop_name: document.getElementById("shop").value,
            opening_time: document.getElementById("time_open").value,
            closing_time: document.getElementById("time_close").value,
            email: localStorage.getItem("user_email")
        };
        if (user.name.length === 0) {
            setNameBool("Name can't be empty");
        } else {
            setNameBool("");
        }
        let re = /^[0-9]{10}$/;
        if (!(re.test(user.contact_number))) {
            setNumberBool("Invalid Number");
            // console.log(numberBool);
        } else {
            setNumberBool("");
        }
        // if (user.shop_name.length === 0) {
        //     setShopBool("Shop name can't be empty");
        // } else {
        //     setShopBool("");
        // }
        if (user.closing_time < user.opening_time) {
            setTimeCloseBool("Closing time can't be less than opening time");
        } else {
            setTimeCloseBool("");
        }
        // console.log(numberBool);

        console.log(user);
        if (!(user.name.length === 0 || !(re.test(user.contact_number)) || user.closing_time < user.opening_time)) {
            console.log("in");
            // console.log(numberBool);
            axios
                .post("/api/profile/vendor_update", user) // unimplemented
                .then((response) => {
                    console.log(response);
                    // setDetails(response.data);
                    // console.log(response.data);
                    // setCallme(true);
                    window.location.reload();
                    alert("Profile Updated");
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            alert("Changes have not been saved");
        }
    }



    // useEffect(() => {
    //     if (name === '' || email === '' || number === '' || shop === '' || timeOpen === '' || timeClose === '' || timeCloseBool !== '') {
    //         console.log(timeCloseBool, timeClose);
    //         setDisableButton(true);
    //     } else {
    //         setDisableButton(false);
    //     }
    // },
    //     [nameBool, emailBool, numberBool, shopBool, timeOpenBool, timeCloseBool, timeClose]
    // );

    return (
        <ThemeProvider theme={theme}>
            {/* {name} */}
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
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Manager's Name"
                                    defaultValue={name}
                                    InputLabelProps={{
                                        shrink: true,
                                        // readOnly: true,
                                    }}
                                    InputProps={{
                                        readOnly: read,
                                    }}
                                    key={`${Math.floor((Math.random() * 1000))}-min`}
                                // onChange={handleNameChange}
                                // error={!(nameBool === '')}
                                // autoFocus
                                />
                                <div style={{ color: 'red' }}>{nameBool}</div>
                            </Grid>
                            {/* <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    defaultValue={email}
                                    onChange={handleEmailChange}
                                    error={!(emailBool === '')}
                                />
                                <div style={{ color: 'red' }}>{emailBool}</div>
                            </Grid> */}
                            <Grid item xs={12}>
                                <TextField
                                    name="number"
                                    required
                                    fullWidth
                                    id="number"
                                    type="number"
                                    defaultValue={number}
                                    key={`${Math.floor((Math.random() * 1000))}-min`}
                                    label="Contact Number"
                                    InputProps={{
                                        readOnly: read,
                                    }}
                                // onChange={handleNumberChange}
                                // error={!(numberBool === '')}
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
                                    defaultValue={shop}
                                    key={`${Math.floor((Math.random() * 1000))}-min`}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                // onChange={handleShopChange}
                                // error={!(shopBool === '')}
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
                                    defaultValue={timeOpen}
                                    key={`${Math.floor((Math.random() * 1000))}-min`}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    sx={{ width: 150 }}
                                    InputProps={{
                                        readOnly: read,
                                    }}
                                // onChange={handleTimeOpenChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="time_close"
                                    label="Closing Time"
                                    type="time"
                                    name="time_close"
                                    // defaultValue="17:30"
                                    defaultValue={timeClose}
                                    key={`${Math.floor((Math.random() * 1000))}-min`}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    sx={{ width: 150 }}
                                    InputProps={{
                                        readOnly: read,
                                    }}
                                    // disabled={(timeOpen === '')}
                                    // onChange={handleTimeCloseChange}
                                    error={document.getElementById("time_close") < document.getElementById("time_open")}
                                />
                                <div style={{ color: 'red' }}>{timeCloseBool}</div>
                            </Grid>
                        </Grid>
                        {/* <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 3 }}

                        >
                            Edit
                        </Button> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={read}
                        >
                            Submit
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 3 }}
                            onClick={() => {
                                setRead(false);
                            }}
                            disabled={!read}
                        >
                            Edit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )

}


function BuyerProfile(props) {
    const [details, setDetails] = useState([]);
    const [nameBool, setNameBool] = React.useState('');
    const [name, setName] = React.useState('');
    const [emailBool, setEmailBool] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [numberBool, setNumberBool] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [ageBool, setAgeBool] = React.useState(true);
    const [age, setAge] = React.useState('');
    const [batch, setBatch] = React.useState('');
    const [batchBool, setBatchBool] = React.useState('');
    // const [disableButton, setDisableButton] = useState(true);
    const [read, setRead] = useState(true);

    useEffect(() => {
        setDetails(props.details);
        setName(props.details.name);
        setEmail(props.details.email);
        setNumber(props.details.contact_number);
        setAge(props.details.age);
        setBatch(props.details.batch);
        // setDisableButton(false);
        setRead(true);
    }, [props.details]);
    console.log(details, props.details);

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            name: document.getElementById("name").value,
            contact_number: document.getElementById("number").value,
            age: document.getElementById("age").value,
            batch: document.getElementById("batch").value,
            email: localStorage.getItem("user_email")
        };
        if (user.name.length === 0) {
            setNameBool("Name can't be empty");
        } else {
            setNameBool("");
        }
        let re = /^[0-9]{10}$/;
        if (!(re.test(user.contact_number))) {
            setNumberBool("Invalid Number");
            // console.log(numberBool);
        } else {
            setNumberBool("");
        }
        if (user.age < 18 || user.age > 100) {
            setAgeBool("Enter an age between 18 and 100");
        } else {
            setAgeBool("");
        }
        if (user.batch < 1 || user.batch > 5) {
            setBatchBool("Enter a valid batch");
        } else {
            setBatchBool("");
        }
        // console.log(numberBool);

        console.log(user);
        if (!(user.name.length === 0 || !(re.test(user.contact_number)) || user.age < 18 || user.age > 100 || user.batch < 1 || user.batch > 5)) {
            console.log("in");
            console.log(user);
            // console.log(numberBool);
            axios
                .post("/api/profile/buyer_update", user) // I WAS HERE
                .then((response) => {
                    console.log(response);
                    // setDetails(response.data);
                    // console.log(response.data);
                    // setCallme(true);
                    window.location.reload();
                    alert("Profile Updated");
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            alert("Changes have not been saved");
        }
    }



    // useEffect(() => {
    //     if (name === '' || email === '' || number === '' || shop === '' || timeOpen === '' || timeClose === '' || timeCloseBool !== '') {
    //         console.log(timeCloseBool, timeClose);
    //         setDisableButton(true);
    //     } else {
    //         setDisableButton(false);
    //     }
    // },
    //     [nameBool, emailBool, numberBool, shopBool, timeOpenBool, timeCloseBool, timeClose]
    // );

    return (
        <ThemeProvider theme={theme}>
            {/* {name} */}
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
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    defaultValue={name}
                                    InputLabelProps={{
                                        shrink: true,
                                        // readOnly: true,
                                    }}
                                    InputProps={{
                                        readOnly: read,
                                    }}
                                    key={`${Math.floor((Math.random() * 1000))}-min`}
                                // onChange={handleNameChange}
                                // error={!(nameBool === '')}
                                // autoFocus
                                />
                                <div style={{ color: 'red' }}>{nameBool}</div>
                            </Grid>
                            {/* <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    defaultValue={email}
                                    onChange={handleEmailChange}
                                    error={!(emailBool === '')}
                                />
                                <div style={{ color: 'red' }}>{emailBool}</div>
                            </Grid> */}
                            <Grid item xs={12}>
                                <TextField
                                    name="number"
                                    required
                                    fullWidth
                                    id="number"
                                    type="number"
                                    defaultValue={number}
                                    key={`${Math.floor((Math.random() * 1000))}-min`}
                                    label="Contact Number"
                                    InputProps={{
                                        readOnly: read,
                                    }}
                                // onChange={handleNumberChange}
                                // error={!(numberBool === '')}
                                />
                                <div style={{ color: 'red' }}>{numberBool}</div>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="age"
                                    required
                                    fullWidth
                                    id="age"
                                    label="Age"
                                    type="number"
                                    defaultValue={age}
                                    key={`${Math.floor((Math.random() * 1000))}-min`}
                                    InputProps={{
                                        readOnly: read,
                                    }}
                                // onChange={handleShopChange}
                                // error={!(shopBool === '')}
                                />
                                <div style={{ color: 'red' }}>{ageBool}</div>
                            </Grid>
                            {/* <Grid item xs={12} sm={6}>
                                <FormControl required fullWidth>
                                    <InputLabel id="batch">Batch</InputLabel>
                                    <Select
                                        labelId="batch"
                                        id="batch"
                                        name="batch"
                                        defaultValue={batch}
                                        value={batch}
                                        label="Batch *"
                                        key={`${Math.floor((Math.random() * 1000))}-min`}
                                        inputProps={{
                                            readOnly: read,
                                        }}
                                        onChange={(e) => setBatch(e.target.value)}
                                    >
                                        <MenuItem value={1}>UG 1</MenuItem>
                                        <MenuItem value={2}>UG 2</MenuItem>
                                        <MenuItem value={3}>UG 3</MenuItem>
                                        <MenuItem value={4}>UG 4</MenuItem>
                                        <MenuItem value={5}>UG 5</MenuItem>
                                    </Select>
                                    <FormHelperText>Required</FormHelperText>
                                </FormControl>
                            </Grid> */}

                            <Grid item xs={6}>
                                <TextField
                                    name="batch"
                                    required
                                    fullWidth
                                    id="batch"
                                    label="Batch"
                                    type="number"
                                    defaultValue={batch}
                                    InputLabelProps={{
                                        shrink: true,
                                        // readOnly: true,
                                    }}
                                    InputProps={{
                                        readOnly: read,
                                        startAdornment: <InputAdornment position="start">UG</InputAdornment>,
                                    }}
                                    key={`${Math.floor((Math.random() * 1000))}-min`}
                                // onChange={handleNameChange}
                                // error={!(nameBool === '')}
                                // autoFocus
                                />
                                <div style={{ color: 'red' }}>{batchBool}</div>
                            </Grid>
                        </Grid>
                        {/* <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 3 }}

                        >
                            Edit
                        </Button> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={read}
                        >
                            Submit
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 3 }}
                            onClick={() => {
                                setRead(false);
                            }}
                            disabled={!read}
                        >
                            Edit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )

}

const Profile = (props) => {
    const [details, setDetails] = useState([]);
    const [callme, setCallme] = useState(false);
    useEffect(() => {
        const user = {
            email: localStorage.getItem("user_email")
        };
        console.log(user);
        if (localStorage.getItem("user_type") === "buyer") {
            axios
                .post("/api/profile/buyer", user) // unimplemented
                .then((response) => {
                    console.log(response);
                    setDetails(response.data);
                    console.log(response.data);
                    setCallme(true);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else if (localStorage.getItem("user_type") === "vendor") {
            axios
                .post("/api/profile/vendor", user) // unimplemented
                .then((response) => {
                    setDetails(response.data);
                    console.log(response.data);
                    setCallme(true);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, []);

    if (localStorage.getItem("user_type") === "buyer") {
        return <BuyerProfile details={details} />;
    } else if (localStorage.getItem("user_type") === "vendor") {
        return (<VendorProfile details={details} />);
    }
};

export default Profile;
