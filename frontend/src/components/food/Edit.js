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

const theme = createTheme();

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
                props.setAddOnPrices([...props.addOnPrices, Number(addOn.price)]);
                // props.setKey(props.key + 1);
            } else {
                let newNames = [...props.addOnNames];
                let newPrices = [...props.addOnPrices];
                newNames[props.index] = addOn.name;
                newPrices[props.index] = Number(addOn.price);
                props.setAddOnNames(newNames);
                props.setAddOnPrices(newPrices);
                // props.setAddOns(newArr);
            }
        }
    };
    return (
        <Box>
            {
                props.index < props.n ?
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id={`addOnName${props.index}`}
                                label="Add On Name"
                                fullWidth
                                size="small"
                                defaultValue={props.addOnNames[props.index]}
                                key={`${Math.floor((Math.random() * 1000))}-min`}
                            // onChange={handleAddOnNameChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id={`addOnPrice${props.index}`}
                                label="Add On Price"
                                fullWidth
                                size="small"
                                type="number"
                                defaultValue={props.addOnPrices[props.index]}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                }}
                                key={`${Math.floor((Math.random() * 1000))}-min`}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button
                                onClick={handleAddOnSubmit}
                                fullWidth
                                variant="contained"
                            >
                                Submit Add On
                            </Button>
                        </Grid>
                    </Grid>
                    :
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id={`addOnName${props.index}`}
                                label="Add On Name"
                                fullWidth
                                size="small"
                            // onChange={handleAddOnNameChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
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
                        <Grid item xs={12} sm={4}>
                            <Button
                                onClick={handleAddOnSubmit}
                                fullWidth
                                variant="contained"
                            >
                                Submit Add On
                            </Button>
                        </Grid>
                    </Grid>
            }
        </Box>
    );
}

function Edit(props) {
    const [numAddOns, setNumAddOns] = React.useState(0);
    const [addOnNames, setAddOnNames] = React.useState([]);
    const [addOnPrices, setAddOnPrices] = React.useState([]);
    const [checked, setChecked] = React.useState(false);
    const [foodData, setFoodData] = React.useState({});
    const [someBool, setSomeBool] = React.useState(false);
    const [defaultNumAddOns, setDefaultNumAddOns] = React.useState(0);
    // let foodData = 0;
    // const [addOns, setAddOns] = React.useState([]);
    var addOns = []
    for (let i = 0; i < numAddOns; i++) {
        addOns.push(
            <Grid key={i} item xs={12} sm={12}>
                <AddOns index={i} n={defaultNumAddOns} addOnNames={addOnNames} setAddOnNames={setAddOnNames} addOnPrices={addOnPrices} setAddOnPrices={setAddOnPrices} />
            </Grid>
        );
    }

    useEffect(() => {
        const myFood = {
            id: localStorage.getItem("food_id")
        }
        axios
            .post("/api/food/getFood", myFood)
            .then((response) => {
                // console.log(response);
                // setDetails(response.data);
                console.log(response.data);
                // setCallme(true);
                setFoodData(response.data);
                // foodData = response.data;
                console.log(foodData);
                if (foodData.name === undefined) {
                    console.log("empty");
                    setSomeBool(true);
                } else {
                    setAddOnNames(foodData.addOnName);
                    setAddOnPrices(foodData.addOnPrice);
                    setChecked(foodData.nonVeg);
                    setNumAddOns(foodData.addOnName.length);
                    setDefaultNumAddOns(foodData.addOnName.length);
                    // setSomeBool(false);
                }
                // console.log(foodData.addOnName);
                // setNumAddOns(foodData.addOnNames.length);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [someBool]);

    // useEffect(() => {
    //     if(foodData === 0) {
    //         console.log("foodData is empty");
    //         return;
    //     } else {
    //         // console.log(foodData);
    //         setNumAddOns(foodData.addOnName.length);
    //         setAddOnNames(foodData.addOnName);
    //         setAddOnPrices(foodData.addOnPrice);
    //         console.log(addOnNames);
    //     }
    // }, [foodData]);

    const handleSubmitItem = (event) => {
        const food = {
            id: localStorage.getItem("food_id"),
            name: document.getElementById("name").value,
            price: document.getElementById("price").value,
            // rating: document.getElementById("rating").value,
            nonVeg: checked,
            vendor_email: localStorage.getItem("user_email"),
            image: document.getElementById("image").value,
            tag: document.getElementById("tags").value.split("\n"),
            addOnName: addOnNames,
            addOnPrice: addOnPrices
        }
        console.log(food);
        if (food.name === '' || food.price === '') {
            alert("Please enter a valid name and price");
        } else {
            axios
                .post("/api/food/edit", food)
                .then((response) => {
                    alert(response.data.message);
                    console.log(response);
                    console.log(response.data);
                    if (response.data.message === "Food Item updated successfully") {
                        window.location.href = "/menu";
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    const handleCancelItem = (event) => {
        // setDisplay(false);
        // document.getElementById("name").value = "";
        // document.getElementById("price").value = "";
        // document.getElementById("tags").value = [];
        // document.getElementById("image").value = "";
        // setChecked(false);
        // setNumAddOns(0);
        // setAddOnNames([]);
        // setAddOnPrices([]);
        localStorage.removeItem("food_id");
        window.location.href = "/menu";
    };

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
                        <Grid container spacing={3} sx={{ py: 2 }}>
                            <Grid item xs={12} sm={4.5}>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    defaultValue={foodData.name}
                                key={`${Math.floor((Math.random() * 1000))}-min`}
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
                                    defaultValue={foodData.price}
                                    key={`${Math.floor((Math.random() * 1000))}-min`}
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
                                    defaultValue={foodData.image}
                                    key={`${Math.floor((Math.random() * 1000))}-min`}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {foodData.tag === undefined ?
                                    <TextField
                                        id="tags"
                                        name="tags"
                                        label="Tags"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        helperText="Enter tags separated by new line"
                                    />
                                    :
                                    <TextField
                                        id="tags"
                                        name="tags"
                                        label="Tags"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        helperText="Enter tags separated by new line"
                                        defaultValue={foodData.tag.join("\n")}
                                    // key={`${Math.floor((Math.random() * 1000))}-min`}
                                    />
                                }
                                {/* <TextField
                                    id="tags"
                                    name="tags"
                                    label="Tags"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    helperText="Enter tags separated by new line"
                                    defaultValue={foodData.tag.join("\n")}
                                    key={`${Math.floor((Math.random() * 1000))}-min`}
                                /> */}
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
                            <Grid item xs={12} sm={6}>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        setAddOnNames(addOnNames.slice(0, numAddOns - 1));
                                        setAddOnPrices(addOnPrices.slice(0, numAddOns - 1));
                                        setNumAddOns(numAddOns - 1);
                                        console.log(addOnNames);
                                    }}
                                    fullWidth
                                >
                                    Subtract Add On
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
                    </Container>
                </Box>
            </main>
        </ThemeProvider>
    );
};

export default Edit;