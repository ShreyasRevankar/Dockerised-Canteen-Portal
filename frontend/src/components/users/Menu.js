import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState, useEffect } from "react";
// import { set } from 'mongoose';
import { TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import Rating from '@mui/material/Rating';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function AddOns(props) {
    const handleAddOnSubmit = (event) => {
        event.preventDefault();
        const addOn = {
            name: document.getElementById(`addOnName${props.index}`).value,
            price: document.getElementById(`addOnPrice${props.index}`).value
        };
        console.log(addOn);
        if (addOn.name === '' || addOn.price === '') {
            alert("Please enter a valid name and price");
        } else {
            if (props.addOnNames.length < props.index) {
                alert("Make sure previous add-ons are added before adding new ones");
            } else if (props.addOnNames.length === props.index) {
                props.setAddOnNames([...props.addOnNames, addOn.name]);
                props.setAddOnPrices([...props.addOnPrices, addOn.price]);
                // props.setKey(props.key + 1);
            } else {
                let newNames = [...props.addOnNames];
                let newPrices = [...props.addOnPrices];
                newNames[props.index] = addOn.name;
                newPrices[props.index] = addOn.price;
                props.setAddOnNames(newNames);
                props.setAddOnPrices(newPrices);
                // props.setAddOns(newArr);
            }
        }
    };

    // const handleAddOnCancel = () => {

    // };
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <TextField
                    id={`addOnName${props.index}`}
                    label="Add On Name"
                    fullWidth
                    size="small"
                // onChange={handleAddOnNameChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id={`addOnPrice${props.index}`}
                    label="Add On Price"
                    fullWidth
                    size="small"
                    type="number"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button
                    onClick={handleAddOnSubmit}
                    fullWidth
                    variant="contained"
                >
                    Submit Add On
                </Button>
            </Grid>
            {/* 
            <Grid item xs={12} sm={6}>
                <Button
                    onClick={handleAddOnCancel}
                    fullWidth
                    variant="contained"
                >
                    Cancel Add On
                </Button>
            </Grid> */}
        </Grid>
    );
}

const theme = createTheme();

export default function Menu() {
    const [foods, setFoods] = React.useState([]);
    const [display, setDisplay] = React.useState(false);
    const [numAddOns, setNumAddOns] = React.useState(0);
    const [addOnNames, setAddOnNames] = React.useState([]);
    const [addOnPrices, setAddOnPrices] = React.useState([]);
    const [checked, setChecked] = React.useState(false);
    const [cards, setCards] = React.useState([]);
    const [shop, setShop] = React.useState("");


    var addOns = []
    for (let i = 0; i < numAddOns; i++) {
        addOns.push(
            <Grid key={i} item xs={12} sm={12}>
                <AddOns index={i} addOnNames={addOnNames} setAddOnNames={setAddOnNames} addOnPrices={addOnPrices} setAddOnPrices={setAddOnPrices} />
            </Grid>
        );
    }

    useEffect(() => {
        // console.log(fdata);
        const user = {
            vendor_email: localStorage.getItem("user_email")
        };
        axios
            .post("/api/food/", user)
            .then(res => {
                console.log(res.data);
                setFoods(res.data);
                setCards(res.data);
                console.log({ cards: cards });
            })
            .catch(err => {
                console.log(err);
            });
        
        axios
            .post("/api/profile/vendor", {email: user.vendor_email})
            .then(res => {
                console.log(res.data);
                setShop(res.data.shop_name);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        setCards(foods);
        // console.log(foods.foodItems);
        // console.log(addOnNames);
        // console.log(addOnPrices);
    }, [foods, addOnNames, addOnPrices]);

    const handleSubmitItem = (event) => {
        const food = {
            name: document.getElementById("name").value,
            price: document.getElementById("price").value,
            // rating: document.getElementById("rating").value,
            nonVeg: checked,
            vendor_email: localStorage.getItem("user_email"),
            image: document.getElementById("image").value,
            tag: document.getElementById("tags").value.split("\n"),
            addOnName: addOnNames,
            addOnPrice: addOnPrices,
            shop_name: shop
        }
        console.log(food);
        if (food.name === '' || food.price === '') {
            alert("Please enter a valid name and price");
        } else {
            axios
                .post("/api/food/add", food)
                .then((response) => {
                    alert(response.data.message);
                    console.log(response);
                    console.log(response.data);
                    if (response.data.message === "Food Item added successfully") {
                        window.location.reload();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    const handleCancelItem = (event) => {
        setDisplay(false);
        document.getElementById("name").value = "";
        document.getElementById("price").value = "";
        document.getElementById("tags").value = [];
        document.getElementById("image").value = "";
        setChecked(false);
        setNumAddOns(0);
        setAddOnNames([]);
        setAddOnPrices([]);
    };

    // const handleEdit = (event) => {
    //     console.log(event.target);
    // };
    function handleEdit(id) {
        localStorage.setItem("food_id", id);
        window.location.href = "/edit";
    }
    // var items = [];

    function handleDelete(id) {
        console.log(id);
        const user = {
            food_id: id,
            vendor_email: localStorage.getItem("user_email")
        };
        axios
            .post("/api/food/delete", user)
            .then(res => {
                console.log(res.data);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Canteen Menu
                        </Typography>
                        {/* <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Something short and leading about the collection below—its contents,
                            the creator, etc. Make it short and sweet, but not too short so folks
                            don&apos;t simply skip over it entirely.
                        </Typography> */}
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button
                                variant="contained"
                                onClick={() => { setDisplay(true) }}
                            >
                                Add Food Item
                            </Button>
                        </Stack>
                        {display ?
                            // <Box component="form" noValidate onSubmit={handleSubmitItem} >
                            <Grid container spacing={3} sx={{ py: 2 }}>
                                <Grid item xs={12} sm={4.5}>
                                    <TextField
                                        id="name"
                                        name="name"
                                        label="Name"
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4.5}>
                                    <TextField
                                        id="price"
                                        name="price"
                                        label="Price"
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            id="nonVeg"
                                            label="Non-Veg"
                                            labelPlacement="top"
                                            checked={checked}
                                            onChange={() => setChecked(!checked)}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        id="image"
                                        name="image"
                                        label="Image URL"
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="tags"
                                        name="tags"
                                        label="Tags"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        helperText="Enter tags separated by new line"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        variant="contained"
                                        onClick={() => { setNumAddOns(numAddOns + 1) }}
                                        fullWidth
                                    >
                                        Add Add On
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    {addOns}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        type="submit"
                                        onClick={handleSubmitItem}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        type="submit"
                                        onClick={handleCancelItem}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                            // </Box>
                            : null}
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}> {/*TODO: Add pagination*/}
                        {cards.map((card) => (
                            <Grid item xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        image={card.image}
                                        alt="random"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.name}
                                        </Typography>
                                        <Typography>
                                            Price: {card.price}
                                            {card.nonVeg ?
                                                <Radio style={{ color: 'red' }} checked />
                                                :
                                                <Radio color="success" checked />
                                            }
                                        </Typography>
                                        <Typography>
                                            <Rating name="read-only" value={card.rating} readOnly />
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => handleEdit(card._id)}>Edit</Button>
                                        <Button size="small" onClick={() => handleDelete(card._id)}>Delete</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
                </Typography>
                <Copyright />
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}