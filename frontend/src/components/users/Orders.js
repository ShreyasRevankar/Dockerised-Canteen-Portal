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
import { send } from 'emailjs-com';


const theme = createTheme();


function Orders(props) {
    const [orders, setOrders] = useState([]);
    const [someBool, setSomeBool] = React.useState(false);
    const [buyer, setBuyer] = React.useState([]);

    useEffect(() => {

        axios
            .post("/api/order/vendor", { vendor: localStorage.getItem("user_id") })
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
    }, [someBool]);

    useEffect(() => {
        axios
            .post("/api/profile/buyerAll")
            .then(res => {
                setBuyer(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    function handleNext(row, i) {

        let newOrders = orders;
        let status = newOrders[i].status;
        let newStatus = "";
        let more10 = true;
        let buyer_email = "";
        if (status === "Placed") {
            let numplaced = 0;
            for (let j = 0; j < newOrders.length; j++) {
                if (newOrders[j].status === "Accepted" || newOrders[j].status === "Cooking") {
                    numplaced++;
                }
            }
            if (numplaced >= 10) {
                more10 = false;
            } else {
                newStatus = "Accepted";
                for (let j = 0; j < buyer.length; j++) {
                    if (buyer[j]._id === newOrders[i].buyer[0]) {
                        buyer_email = buyer[j].email;
                    }
                }
            }
        } else if (status === "Accepted") {
            newStatus = "Cooking";
        } else if (status === "Cooking") {
            newStatus = "Ready For Pickup";
        }
        if (more10) {
            setOrders(newOrders);
            axios
                .post("/api/order/updateStatus", {
                    id: row._id,
                    status: newStatus
                })
                .then(res => {
                    console.log(res.data);
                    if (newStatus === "Accepted") {
                        const sending = {
                            from_name: orders[i].vendor[1],
                            to_email: buyer_email,
                            to_name: orders[i].buyer[1],
                            order_id: orders[i]._id,
                            order_name: orders[i].foodItem[1],
                            status: "Accepted",
                        };
                        console.log(sending);
                        send(
                            'service_wnpsr9e',
                            'template_cd9dva2',
                            sending,
                            'user_9wqz3CIibR6VQLVJuRUnD'
                        )
                            .then((response) => {
                                console.log(response);
                                window.location.reload();
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    } else {
                        window.location.reload();
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            alert("You have 10 orders in progress. Please wait for one to finish before accepting another order.");
        }
    }

    function handleReject(row, i) {
        let newOrders = orders;
        let status = newOrders[i].status;
        let newStatus = "Rejected";
        let buyer_email = "";
        for (let j = 0; j < buyer.length; j++) {
            if (buyer[j]._id === newOrders[i].buyer[0]) {
                buyer_email = buyer[j].email;
            }
        }
        const sending = {
            from_name: orders[i].vendor[1],
            to_email: buyer_email,
            to_name: orders[i].buyer[1],
            order_id: orders[i]._id,
            order_name: orders[i].foodItem[1],
            status: "Rejected",
        };
        console.log(sending);

        setOrders(newOrders);
        axios
            .post("/api/order/updateStatus", {
                id: row._id,
                status: newStatus
            })
            .then(res => {
                console.log(res.data);
                axios
                    .post("/api/profile/buyer_update_money", {
                        id: row.buyer[0],
                        money: row.totalPrice
                    })
                    .then((response) => {
                        console.log(response);
                        // setDetails(response.data);
                        console.log(response.data);
                        // setCallme(true);
                        send(
                            'service_wnpsr9e',
                            'template_cd9dva2',
                            sending,
                            'user_9wqz3CIibR6VQLVJuRUnD'
                        )
                            .then((response) => {
                                console.log(response);
                                window.location.reload();
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(err => {
                console.log(err);
            });



        // IMPLEMENT REFUND TO BUYER
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
                            <TableCell align="right">Ordered By</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Total Price</TableCell>
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
                                <TableCell align="right">{row.buyer[1]}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">{row.totalPrice}</TableCell>

                                {row.status === "Placed" ?
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleNext(row, index)}
                                        >
                                            Accept
                                        </Button>
                                    </TableCell>
                                    : row.status === "Accepted" || row.status === "Cooking" ?
                                        <TableCell align="right">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleNext(row, index)}
                                            >
                                                Move to Next Stage
                                            </Button>
                                        </TableCell>
                                        :
                                        <TableCell align="right" />
                                }
                                {row.status === "Placed" ?
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleReject(row, index)}
                                        >
                                            Reject
                                        </Button>
                                    </TableCell>
                                    :
                                    <></>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
    );
};


export default Orders;