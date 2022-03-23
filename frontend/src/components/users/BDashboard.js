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
import { TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import Rating from '@mui/material/Rating';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Avatar from '@mui/material/Avatar';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import { calendarPickerClasses } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import Chip from '@mui/material/Chip';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Fuse from 'fuse.js'
// import SearchBar from "material-ui-search-bar";

const theme = createTheme();

function Dashboard() {
    const [foods, setFoods] = React.useState([]);
    const [display, setDisplay] = React.useState(false);
    const [numAddOns, setNumAddOns] = React.useState(0);
    const [addOnNamess, setAddOnNamess] = React.useState([]);
    const [addOnPricess, setAddOnPricess] = React.useState([]);
    const [checkedNV, setCheckedNV] = React.useState(false);
    const [checkedV, setCheckedV] = React.useState(false);
    const [cards, setCards] = React.useState([]);
    // const [vendorNames, setVendorNames] = React.useState([]);
    // const [fvendorNames, setFVendorNames] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState("");
    const [balance, setBalance] = React.useState(0);
    const [selectedShop, setSelectedShop] = React.useState([]);
    const [shopNames, setShopNames] = React.useState([]);
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [tags, setTags] = React.useState([]);
    // const [opening_times, setOpening_times] = React.useState([]);
    // const [closing_times, setClosing_times] = React.useState([]);
    const [fav, setFav] = React.useState([]);
    const [vendors, setVendors] = React.useState([]);
    const [shopTimes, setShopTimes] = React.useState({});
    const [favCards, setFavCards] = React.useState([]);
    const [displayFav, setDisplayFav] = React.useState(false);
    const [unavailabe, setUnavailabe] = React.useState([]);
    const [available, setAvailable] = React.useState([]);
    // let newNames = vendorNames;
    // let newNames = [];

    useEffect(() => {
        axios
            .post("/api/food/all")
            .then(res => {
                console.log(res.data);
                setFoods(res.data);
                setCards(res.data);

                let newNames = new Set();
                for (let i = 0; i < res.data.length; i++) {
                    newNames.add(res.data[i].shop_name);
                }
                setShopNames([...newNames]);

                let newTags = new Set();
                for (let i = 0; i < res.data.length; i++) {
                    for (let j = 0; j < res.data[i].tag.length; j++) {
                        newTags.add(res.data[i].tag[j]);
                    }
                }
                setTags([...newTags]);
                console.log({ cards: cards });


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
                        setBalance(response.data.money);
                        setFav(response.data.fav);
                        let newFavCards = [];
                        for (let i = 0; i < res.data.length; i++) {
                            if (response.data.fav.includes(res.data[i]._id)) {
                                newFavCards.push(res.data[i]);
                            }
                        }
                        setFavCards(newFavCards);
                        // setCallme(true);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                axios
                    .post("/api/profile/getTimes")
                    .then((timeResponse) => {
                        console.log(timeResponse);
                        setVendors(timeResponse.data);
                        let now = new Date();
                        let newTimes = {};
                        // let newUnv = [];
                        for (let i = 0; i < timeResponse.data.length; i++) {
                            let open = timeResponse.data[i].opening_time.split(":");
                            let close = timeResponse.data[i].closing_time.split(":");
                            let hr = now.getHours();
                            let min = now.getMinutes();
                            if (parseInt(open[0]) < hr && parseInt(close[0]) > hr) {
                                newTimes[timeResponse.data[i].shop_name] = true;
                            } else if (parseInt(open[0]) === hr && parseInt(open[1]) <= min) {
                                newTimes[timeResponse.data[i].shop_name] = true;
                            } else if (parseInt(close[0]) === hr && parseInt(close[1]) >= min) {
                                newTimes[timeResponse.data[i].shop_name] = true;
                            } else {
                                newTimes[timeResponse.data[i].shop_name] = false;
                            }
                            let newUnv = [];
                            let newAvail = [];
                            for (let j = 0; j < res.data.length; j++) {
                                if (timeResponse.data[i].shop_name === res.data[j].shop_name) {
                                    if (newTimes[timeResponse.data[i].shop_name]) {
                                        // res.data[j].available = true;
                                        newAvail.push(res.data[j]);
                                    } else {
                                        // res.data[j].available = false;
                                        newUnv.push(res.data[j]);
                                    }
                                }
                            }
                            setUnavailabe(newUnv);
                            setAvailable(newAvail);
                        }
                        setShopTimes(newTimes);
                        // setOpening_times(timeResponse.data.opening_times);
                        // setClosing_times(timeResponse.data.closing_times);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(err => {
                console.log(err);
            });
        const user = {
            email: localStorage.getItem("user_email")
        };
        console.log(user);
        // axios
        //     .post("/api/profile/buyer", user)
        //     .then((response) => {
        //         console.log(response);
        //         // setDetails(response.data);
        //         console.log(response.data);
        //         setBalance(response.data.money);
        //         setFav(response.data.fav);
        //         let newFavCards = [];
        //         for (let i = 0; i < foods.length; i++) {
        //             if(response.data.fav.includes(foods[i]._id)) {
        //                 newFavCards.push(foods[i]);
        //             }
        //         }
        //         setFavCards(newFavCards);
        //         // setCallme(true);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });         

        axios
            .post("/api/profile/getTimes")
            .then((response) => {
                console.log(response);
                setVendors(response.data);
                let now = new Date();
                let newTimes = {};
                // let newUnv = [];
                for (let i = 0; i < response.data.length; i++) {
                    let open = response.data[i].opening_time.split(":");
                    let close = response.data[i].closing_time.split(":");
                    let hr = now.getHours();
                    let min = now.getMinutes();
                    if (parseInt(open[0]) < hr && parseInt(close[0]) > hr) {
                        newTimes[response.data[i].shop_name] = true;
                    } else if (parseInt(open[0]) === hr && parseInt(open[1]) <= min) {
                        newTimes[response.data[i].shop_name] = true;
                    } else if (parseInt(close[0]) === hr && parseInt(close[1]) >= min) {
                        newTimes[response.data[i].shop_name] = true;
                    } else {
                        newTimes[response.data[i].shop_name] = false;
                    }
                }
                setShopTimes(newTimes);
                // setOpening_times(response.data.opening_times);
                // setClosing_times(response.data.closing_times);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        // let k = foods;
        // k.sort((a, b) => (!shopTimes[a.shop_name] || shopTimes[b.shop_name]));
        setCards(foods);
        let newNames = new Set();
        for (let i = 0; i < foods.length; i++) {
            newNames.add(foods[i].shop_name);
        }
        setShopNames([...newNames]);

        let newTags = new Set();
        for (let i = 0; i < foods.length; i++) {
            for (let j = 0; j < foods[i].tag.length; j++) {
                newTags.add(foods[i].tag[j]);
            }
        }
        setTags([...newTags]);

        console.log({ cards: cards });

        let now = new Date();
        let newTimes = {};
        for (let i = 0; i < vendors.length; i++) {
            let open = vendors[i].opening_time.split(":");
            let close = vendors[i].closing_time.split(":");
            let hr = now.getHours();
            let min = now.getMinutes();
            if (parseInt(open[0]) < hr && parseInt(close[0]) > hr) {
                newTimes[vendors[i].shop_name] = true;
            } else if (parseInt(open[0]) === hr && parseInt(open[1]) <= min) {
                newTimes[vendors[i].shop_name] = true;
            } else if (parseInt(close[0]) === hr && parseInt(close[1]) >= min) {
                newTimes[vendors[i].shop_name] = true;
            } else {
                newTimes[vendors[i].shop_name] = false;
            }
            let newUnv = [];
            let newAvail = [];
            for (let j = 0; j < foods.length; j++) {
                if (vendors[i].shop_name === foods[j].shop_name) {
                    if (newTimes[vendors[i].shop_name]) {
                        // foods[j].available = true;
                        newAvail.push(foods[j]);
                    } else {
                        // foods[j].available = false;
                        newUnv.push(foods[j]);
                    }
                }
            }
            setUnavailabe(newUnv);
            setAvailable(newAvail);
        }
        setShopTimes(newTimes);

        let newFavCards = [];
        for (let i = 0; i < foods.length; i++) {
            if (fav.includes(foods[i]._id)) {
                newFavCards.push(foods[i]);
            }
        }
        setFavCards(newFavCards);
    }, [foods, addOnNamess, addOnPricess]);

    function handleClickOpen(props) {
        setSelectedValue(props);
        setOpen(true);
    };

    function handleClose(props) {
        setOpen(false);
        setSelectedValue(props);
    }

    function handleSearch() {
        console.log("searching");
        let search = document.getElementById("search").value;
        console.log(search);
        // covert search to lowercase
        search = search.toLowerCase();
        if (search === "") {
            setCards(foods);
        } else {
            let newCards = [];
            for (let i = 0; i < foods.length; i++) {
                let x = foods[i].name;
                x = x.toLowerCase();
                if (x.includes(search)) {
                    newCards.push(foods[i]);
                }
            }
            setCards(newCards);
        }
    }

    function handleFuzzySearch() {
        console.log("fuzzy searching");
        let search = document.getElementById("fuzzySearch").value;
        console.log(search);
        // covert search to lowercase
        search = search.toLowerCase();
        if (search === "") {
            setCards(foods);
        } else {
            const fuse = new Fuse(foods, {
                keys: ["name"]
            });
            // console.log(foods.name);
            let result = fuse.search(search);
            let newCards = [];
            for (var i = 0; i < result.length; i++) {
                newCards.push(result[i].item);
            }
            console.log(newCards);
            setCards(newCards);
        }
    }

    function handleVeg() {
        const newV = !checkedV;
        if ((newV && checkedNV) || (!newV && !checkedNV)) {
            setCards(foods);
        } else if (checkedNV) {
            let newCards = [];
            for (let i = 0; i < foods.length; i++) {
                if (foods[i].nonVeg) {
                    newCards.push(foods[i]);
                }
            }
            setCards(newCards);
        } else if (newV) {
            let newCards = [];
            for (let i = 0; i < foods.length; i++) {
                if (!foods[i].nonVeg) {
                    newCards.push(foods[i]);
                }
            }
            setCards(newCards);
        }
        setCheckedV(!checkedV);
    };

    function handleNonVeg() {
        const newNV = !checkedNV;
        if ((newNV && checkedV) || (!newNV && !checkedV)) {
            setCards(foods);
        } else if (checkedV) {
            let newCards = [];
            for (let i = 0; i < foods.length; i++) {
                if (!foods[i].nonVeg) {
                    newCards.push(foods[i]);
                }
            }
            setCards(newCards);
        } else if (newNV) {
            let newCards = [];
            for (let i = 0; i < foods.length; i++) {
                if (foods[i].nonVeg) {
                    newCards.push(foods[i]);
                }
            }
            setCards(newCards);
        }
        setCheckedNV(!checkedNV);
    }

    function handleShop(e) {
        let k = e.target.value;
        if (k.length === 0) {
            setCards(foods);
        } else {
            let newCards = [];
            for (let i = 0; i < foods.length; i++) {
                for (let j = 0; j < k.length; j++) {
                    if (foods[i].shop_name === k[j]) {
                        newCards.push(foods[i]);
                        break;
                    }
                }
            }
            setCards(newCards);
        }
        setSelectedShop(e.target.value);
        // console.log(e.target.value);
    }

    function handleTag(e) {
        let k = e.target.value;
        if (k.length === 0) {
            setCards(foods);
        } else {
            let newCards = [];
            for (let i = 0; i < foods.length; i++) {
                let w = false;
                for (let j = 0; j < k.length; j++) {
                    for (let l = 0; l < foods[i].tag.length; l++) {
                        if (foods[i].tag[l] === k[j]) {
                            newCards.push(foods[i]);
                            w = true;
                            break;
                        }
                    }
                    if (w) {
                        break;
                    }
                }
            }
            setCards(newCards);
        }
        setSelectedTags(e.target.value);
        // console.log(e.target.value);
    }

    function handlePrice() {
        let min = document.getElementById("minPrice").value;
        let max = document.getElementById("maxPrice").value;
        if (min === "" && max === "") {
            setCards(foods);
        } else if (min === "") {
            let newCards = [];
            for (let i = 0; i < foods.length; i++) {
                if (foods[i].price <= max) {
                    newCards.push(foods[i]);
                }
            }
            setCards(newCards);
        } else if (max === "") {
            let newCards = [];
            for (let i = 0; i < foods.length; i++) {
                if (foods[i].price >= min) {
                    newCards.push(foods[i]);
                }
            }
            setCards(newCards);
        } else {
            let newCards = [];
            for (let i = 0; i < foods.length; i++) {
                if (foods[i].price >= min && foods[i].price <= max) {
                    newCards.push(foods[i]);
                }
            }
            setCards(newCards);
        }
    }

    function sortPriceAsc() {
        let newCards = [...cards];
        newCards.sort((a, b) => a.price - b.price);
        setCards(newCards);
    }

    function sortPriceDesc() {
        let newCards = [...cards];
        newCards.sort((a, b) => b.price - a.price);
        setCards(newCards);
    }

    function sortRatingAsc() {
        let newCards = [...cards];
        newCards.sort((a, b) => a.rating - b.rating);
        setCards(newCards);
    }

    function sortRatingDesc() {
        let newCards = [...cards];
        newCards.sort((a, b) => b.rating - a.rating);
        setCards(newCards);
    }

    function handleFav(card) {
        axios
            .post("/api/profile/updateFav", {
                id: localStorage.getItem("user_id"),
                food: card._id
            })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        window.location.reload();
    }

    function displayAvailable(card, index) {
        if(shopTimes[card.shop_name]) {
            return (
                <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {card.name}
                                </TableCell>
                                <TableCell align="right">
                                    <img
                                        src={card.image}
                                        alt="food"
                                        width="100"
                                        height="100"
                                    />
                                </TableCell>
                                <TableCell align="right">{card.price}</TableCell>
                                <TableCell align="right">{card.shop_name}</TableCell>
                                <TableCell align="right">
                                    <Rating
                                        name="simple-controlled"
                                        value={card.rating}
                                        readOnly
                                    />
                                </TableCell>
                                {card.nonVeg ? (
                                    <TableCell align="right"><Radio style={{ color: 'red' }} checked /></TableCell>
                                ) : (
                                    <TableCell align="right"><Radio color="success" checked /></TableCell>
                                )}
                                <TableCell align="right">
                                    <Stack>
                                        {card.tag.map((tag) => (
                                            <Chip key={tag} label={tag} />
                                        ))}
                                    </Stack>
                                </TableCell>
                                {/* Order Button */}
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleClickOpen(card)}
                                        disabled={!shopTimes[card.shop_name]}
                                    >
                                        Order
                                    </Button>
                                    {open ?
                                        <SimpleDialog
                                            selectedValue={selectedValue}
                                            open={open}
                                            onClose={handleClose}
                                            balance={balance}
                                        />
                                        : null}
                                </TableCell>
                                {/* Add to Favourites button */}
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleFav(card)}
                                    >
                                        {/* <FavoriteIcon /> */}
                                        {fav.includes(card._id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                    </Button>
                                </TableCell>
                            </TableRow>
            );
        } else {
            return null;
        }
    }

    function displayUnavailable(card, index) {
        if(!shopTimes[card.shop_name]) {
            return (
                <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {card.name}
                                </TableCell>
                                <TableCell align="right">
                                    <img
                                        src={card.image}
                                        alt="food"
                                        width="100"
                                        height="100"
                                    />
                                </TableCell>
                                <TableCell align="right">{card.price}</TableCell>
                                <TableCell align="right">{card.shop_name}</TableCell>
                                <TableCell align="right">
                                    <Rating
                                        name="simple-controlled"
                                        value={card.rating}
                                        readOnly
                                    />
                                </TableCell>
                                {card.nonVeg ? (
                                    <TableCell align="right"><Radio style={{ color: 'red' }} checked /></TableCell>
                                ) : (
                                    <TableCell align="right"><Radio color="success" checked /></TableCell>
                                )}
                                <TableCell align="right">
                                    <Stack>
                                        {card.tag.map((tag) => (
                                            <Chip key={tag} label={tag} />
                                        ))}
                                    </Stack>
                                </TableCell>
                                {/* Order Button */}
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleClickOpen(card)}
                                        disabled={!shopTimes[card.shop_name]}
                                    >
                                        Order
                                    </Button>
                                    {open ?
                                        <SimpleDialog
                                            selectedValue={selectedValue}
                                            open={open}
                                            onClose={handleClose}
                                            balance={balance}
                                        />
                                        : null}
                                </TableCell>
                                {/* Add to Favourites button */}
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleFav(card)}
                                    >
                                        {/* <FavoriteIcon /> */}
                                        {fav.includes(card._id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                    </Button>
                                </TableCell>
                            </TableRow>
            );
        } else {
            return null;
        }
    }


    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <MenuBookTwoToneIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Dashboard
                </Typography>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h6">
                        Balance: {balance}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            setDisplayFav(!displayFav);
                        }}
                    >
                        <FavoriteIcon />
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {displayFav ?
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Food Item</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Rating</TableCell>
                                        <TableCell align="right">Shop</TableCell>
                                        <TableCell align="right">Tags</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {favCards.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.price}</TableCell>
                                            <TableCell align="right">
                                                <Rating
                                                    name="simple-controlled"
                                                    value={row.rating}
                                                    readOnly
                                                />
                                            </TableCell>
                                            <TableCell align="right">{row.shop_name}</TableCell>
                                            <TableCell align="right">
                                                <Stack>
                                                    {row.tag.map((tag) => (
                                                        <Chip key={tag} label={tag} />
                                                    ))}
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        : null}
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setDisplay(!display);
                        }}
                    >
                        <FilterListIcon />
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {display ?
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    id="search"
                                    label="Search"
                                    type="search"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={0.75}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleSearch()}
                                >
                                    <SearchIcon />
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    id="fuzzySearch"
                                    label="Fuzzy Search"
                                    type="search"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={0.75}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleFuzzySearch()}
                                >
                                    <SearchIcon />
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={0.75}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        id="nonVeg"
                                        label="Veg"
                                        // labelPlacement="top"
                                        checked={checkedV}
                                        onChange={() => handleVeg()}
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={1.5}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        id="nonVeg"
                                        label="Non-Veg"
                                        // labelPlacement="top"
                                        checked={checkedNV}
                                        onChange={() => handleNonVeg()}
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="shop_select">Shop</InputLabel>
                                    <Select
                                        // label="Shop"
                                        labelId="shop_select"
                                        id="shop_select"
                                        multiple
                                        size="small"
                                        value={selectedShop}
                                        onChange={(e) => handleShop(e)}
                                    >
                                        {shopNames.map((addon) => (
                                            <MenuItem key={addon} value={addon}>
                                                {addon}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="tag_select">Tags</InputLabel>
                                    <Select
                                        labelId="tag_select"
                                        id="tag_select"
                                        multiple
                                        size="small"
                                        value={selectedTags}
                                        onChange={(e) => handleTag(e)}
                                    >
                                        {tags.map((addon) => (
                                            <MenuItem key={addon} value={addon}>
                                                {addon}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            {/* Min and Max Price */}
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    id="minPrice"
                                    label="Min Price"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={() => handlePrice()}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    id="maxPrice"
                                    label="Max Price"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={() => handlePrice()}
                                />
                            </Grid>
                            {/* End of Min and Max Price */}
                            {/* Sort according to price */}
                            <Grid item xs={12} sm={1.5}>
                                <Typography>
                                    Sort by Price
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={0.75}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => sortPriceDesc()}
                                >
                                    <ArrowUpwardIcon />
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={0.75}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => sortPriceAsc()}
                                >
                                    <ArrowDownwardIcon />
                                </Button>
                            </Grid>
                            {/* End of Sort according to price */}
                            {/* Sort according to rating */}
                            <Grid item xs={12} sm={1.5}>
                                <Typography>
                                    Sort by Rating
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={0.75}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => sortRatingDesc()}
                                >
                                    <ArrowUpwardIcon />
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={0.75}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => sortRatingAsc()}
                                >
                                    <ArrowDownwardIcon />
                                </Button>
                            </Grid>
                        </Grid>
                        : null}
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Food Item</TableCell>
                            <TableCell align="right">Image</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Vendor</TableCell>
                            <TableCell align="right">Rating</TableCell>
                            <TableCell align="right">Veg/Non-veg</TableCell>
                            <TableCell align="center">Tags</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards.map((card, index) => displayAvailable(card, index))}
                        {cards.map((card, index) => displayUnavailable(card, index))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
    );
};

function SimpleDialog(props) {
    const [quantity, setQuantity] = React.useState(1);
    const [addOnNames, setAddOnNames] = React.useState(props.selectedValue.addOnName);
    const [addOnPrices, setAddOnPrices] = React.useState(props.selectedValue.addOnPrice);
    const [selectedAddOnNames, setSelectedAddOnNames] = React.useState([]);
    const [selectedAddOnPrices, setSelectedAddOnPrices] = React.useState([]);
    // const [a, setA] = React.useState([1, 2]);
    var realAddOnNames = [];
    var realAddOnPrices = [];

    const handlebuy = () => {
        //get time in int
        // const time = new Date().getTime();
        // convert quantity to int
        // const q = parseInt(quantity);
        // var p = parseInt(props.selectedValue.price);
        // // run loop on addonprice
        // for (let i = 0; i < selectedAddOnPrice.length; i++) {
        //     // convert addonprice to int
        //     const ap = parseInt(selectedAddOnPrice[i]);
        //     // add addonprice to p
        //     p = p + ap;
        // }
        // // add quantity to p
        // p = p * q;
        const p = calculateTotalPrice(props.selectedValue.price, selectedAddOnPrices, quantity);
        if (p > props.balance) {
            alert("Insufficient Balance");
            props.onClose();
        } else {
            // vendor query
            axios
                .post("/api/profile/vendor", { email: props.selectedValue.vendor_email }) // unimplemented
                .then((response_vendor) => {
                    console.log(response_vendor.data);

                    // buyer query
                    axios
                        .post("/api/profile/buyer", { email: localStorage.getItem("user_email") }) // unimplemented
                        .then((response_buyer) => {
                            console.log(response_buyer.data);

                            // order query
                            const order_data = {
                                foodItem: [props.selectedValue._id, props.selectedValue.name],
                                vendor: [response_vendor.data._id, response_vendor.data.shop_name],
                                buyer: [localStorage.getItem("user_id"), response_buyer.data.name],
                                quantity: quantity,
                                addOns: selectedAddOnNames,
                                totalPrice: p,
                            }
                            console.log(order_data);
                            axios
                                .post("/api/order/add", order_data)
                                .then((res) => {
                                    console.log(res);
                                })
                                .catch((err) => {
                                    console.log(err);
                                });

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                })
                .catch(function (error) {
                    console.log(error);
                });

            //deduct money
            const user = {
                id: localStorage.getItem("user_id"),
                money: p * -1
            };
            axios
                .post("/api/profile/buyer_update_money", user)
                .then((response_w) => {
                    console.log(response_w);
                    // setDetails(response.data);
                    console.log(response_w.data);
                    // setWallet(response.data.money);
                    // setCallme(true);
                })
                .catch(function (error) {
                    console.log(error);
                });
            props.onClose();
        }
    };

    function calculateTotalPrice(p, a, q) {
        var total = p;
        for (let i = 0; i < a.length; i++) {
            const ap = parseInt(a[i]);
            total = total + ap;
        }
        total = total * q;
        return total;
    }

    return (
        <Dialog onClose={props.onClose} open={props.open}>
            <DialogTitle>A few more steps...</DialogTitle>
            <br></br>
            {/* Details of the product */}
            {/* {selectedValue} */}
            <Box>
                <Stack spacing={2}>
                    <TextField
                        id="outlined-basic"
                        label="ItemName"
                        variant="outlined"
                        value={props.selectedValue.name}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="ShopName"
                        variant="outlined"
                        value={props.selectedValue.shop_name}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Price"
                        variant="outlined"
                        value={props.selectedValue.price}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        id="quantity"
                        label="Quantity"
                        type="number"
                        variant="outlined"
                        defaultValue={1}
                        onChange={(e) => {
                            setQuantity(e.target.value);
                        }}
                    />
                    {/* <div>{props.selectedValue.addOnName[0]}</div> */}
                    <FormControl variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">
                            AddOns
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            multiple
                            value={selectedAddOnNames}
                            onChange={(e) => {
                                setSelectedAddOnNames(e.target.value);
                                console.log(selectedAddOnNames);
                                realAddOnNames = e.target.value;
                                console.log(realAddOnNames);
                                // Set selectedaddOnPrices as the same index as selectedaddOnNames
                                setSelectedAddOnPrices(
                                    e.target.value.map((addon) => {
                                        return addOnPrices[addOnNames.indexOf(addon)];
                                    })
                                );
                            }}
                            label="AddOns"
                            variant="outlined"
                        >
                            {addOnNames.map((addon) => (
                                <MenuItem key={addon} value={addon}>
                                    {addon}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br></br>
                    Total Price: {calculateTotalPrice(props.selectedValue.price, selectedAddOnPrices, quantity)}
                </Stack>
            </Box>
            <br></br>
            <Button variant="contained" color="primary" onClick={handlebuy}>
                Buy
            </Button>
            {/* Set quantity to order */}
        </Dialog>
    );
}

export default Dashboard;