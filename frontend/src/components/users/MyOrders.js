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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Avatar from '@mui/material/Avatar';


const theme = createTheme();


function MyOrders(props) {
    const [orders, setOrders] = useState([]);
    const [someBool, setSomeBool] = React.useState(false);
    const [rating, setRating] = React.useState(0);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {

        axios
            .post("/api/order/buyer", { buyer: localStorage.getItem("user_id") })
            .then(res => {
                console.log(res.data);
                setOrders(res.data);
                if (orders[0] === undefined) {
                    console.log("empty");
                    setSomeBool(true);
                } else {
                    // setOrders(res.data);
                    console.log(orders);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [someBool, refresh]);

    function handleNext(row, i) {

        let newOrders = orders;
        let status = newOrders[i].status;
        let newStatus = "Completed";
        setOrders(newOrders);
        axios
            .post("/api/order/updateStatus", {
                id: row._id,
                status: newStatus
            })
            .then(res => {
                console.log(res.data);
                // setRefresh(!refresh);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    };

    function handleRating(newValue, row, i) {
        let newOrders = orders;
        let rating = newOrders[i].rating;
        let newRating = newValue;
        setOrders(newOrders);
        axios
            .post("/api/order/updateRating", {
                id: row._id,
                rating: newRating
            })
            .then(res => {
                console.log(res.data);
                setRefresh(!refresh);
                // window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
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
                    <RestaurantIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Orders
                </Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Food Item</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Add Ons</TableCell>
                            <TableCell align="right">Placed Time</TableCell>
                            <TableCell align="right">Ordered From</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Total Price</TableCell>
                            <TableCell align="right">Rating</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((row, index) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.foodItem[1]}
                                </TableCell>
                                <TableCell align="right">{row.quantity}</TableCell>
                                <TableCell align="right">{row.addOns.join("\n")}</TableCell>
                                <TableCell align="right">{row.orderDate}</TableCell>
                                <TableCell align="right">{row.vendor[1]}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">{row.totalPrice}</TableCell>
                                {row.status === "Completed" && row.rating === 0 ?
                                    <TableCell align="right">
                                        <Rating
                                            name="rating"
                                            value={row.rating}
                                            onChange={(event, newValue) => handleRating(newValue, row, index)}
                                        />
                                    </TableCell>
                                    : row.status === "Completed" && row.rating !== 0 ?
                                        <TableCell align="right">
                                            <Rating
                                                name="rating"
                                                value={row.rating}
                                                readOnly
                                            />
                                        </TableCell>
                                    :
                                        <TableCell align="right">
                                            <Rating
                                                name="rating"
                                                value={row.rating}
                                                disabled
                                            />
                                        </TableCell>
                                }
                                {row.status === "Ready For Pickup" ?
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleNext(row, index)}
                                        >
                                            Picked Up
                                        </Button>
                                    </TableCell>
                                    :
                                    <TableCell align="right" />
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
    );
};


export default MyOrders;