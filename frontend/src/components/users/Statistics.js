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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListSubheader from "@mui/material/ListSubheader";
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    BarSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { FiberManualRecordSharp } from '@mui/icons-material';

const theme = createTheme();

function Statistics() {
    const [top5, setTop5] = useState(["", "", "", "", ""]);
    const [placed, setPlaced] = useState(0);
    const [pending, setPending] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [rejected, setRejected] = useState(0);
    const [batch, setBatch] = useState([]);
    const [display, setDisplay] = useState(false);
    const [age, setAge] = useState([]);




    useEffect(() => {
        axios
            .post("/api/statistics/top5", { id: localStorage.getItem("user_id") })
            .then(res => {
                console.log(res.data);
                let newTop5 = ["nil", "nil", "nil", "nil", "nil"];
                for (let i = 0; i < res.data.length; i++) {
                    newTop5[i] = res.data[i][0];
                }

                setTop5(newTop5);
            })
            .catch(err => {
                console.log(err);
            });

        axios
            .post("/api/statistics/counts", { id: localStorage.getItem("user_id") })
            .then(res => {
                console.log(res.data);
                setPlaced(res.data.placed);
                setPending(res.data.pending);
                setCompleted(res.data.completed);
                setRejected(res.data.rejected);
            })
            .catch(err => {
                console.log(err);
            });

        axios
            .post("/api/statistics/batch", { id: localStorage.getItem("user_id") })
            .then(res => {
                console.log(res.data);
                // setBatch(res.data);
                let newBatch = [];
                for (let i = 0; i < res.data.length; i++) {
                    newBatch.push({ argument: i + 1, value: res.data[i] });
                }
                setBatch(newBatch);
            })
            .catch(err => {
                console.log(err);
            });

        axios
            .post("/api/statistics/age", { id: localStorage.getItem("user_id") })
            .then(res => {
                console.log(res.data);
                let newAge = [];
                for (let i = 0; i < res.data.length; i++) {
                    let num1 = i * 10 + 1;
                    let num2 = i * 10 + 10;
                    let str1 = num1.toString();
                    let str2 = num2.toString();
                    let final = str1 + "-" + str2;
                    newAge.push({ argument: final, value: res.data[i] });
                }
                setAge(newAge);
            })
            .catch(err => {
                console.log(err);
            });
    }, [display]);

    // const handleclick = () => {
    //     databatch = [];
    //     dataage = [];
    //     databatch = batch;

    //     // console.log(arr1.length, arr2.length);
    //     for (let i = 0; i < arr1.length; i++) {
    //         for (let j = 0; j < arr2.length; j++) {
    //             // console.log(arr1[i], arr2[j], arrbatch[j], arrage[j]);
    //             if (arr1[i] == arr2[j]) {
    //                 databatch[arrbatch[j]].value = databatch[arrbatch[j]].value + 1;
    //                 // console.log(databatch);
    //                 if (freqage[arrage[j]] == undefined) {
    //                     freqage[arrage[j]] = 1;
    //                 }
    //                 else {
    //                     freqage[arrage[j]] = freqage[arrage[j]] + 1;
    //                 }
    //                 dataage.push({
    //                     argument: arrage[j],
    //                     value: freqage[arrage[j]],
    //                 });
    //             }

    //         }
    //     }
    //     setRefresh(!refresh);
    // };

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <List>
                    <ListSubheader>
                        <center>
                            <h3>Most ordered food items</h3>
                        </center>
                    </ListSubheader>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Item 1" secondary={top5[0]} />
                        <ListItemText primary="Item 2" secondary={top5[1]} />
                        <ListItemText primary="Item 3" secondary={top5[2]} />
                        <ListItemText primary="Item 4" secondary={top5[3]} />
                        <ListItemText primary="Item 5" secondary={top5[4]} />
                    </ListItem>
                    <Divider />
                </List>
            </Box>
            <Box p={2}>
                <Stack>
                    <List>
                        <ListItem>
                            <ListItemText primary="Orders Placed:" secondary={placed} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary="Orders Pending:" secondary={pending} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary="Orders Completed:" secondary={completed} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary="Orders Rejected:" secondary={rejected} />
                        </ListItem>
                        <Divider />
                    </List>
                </Stack>
            </Box >
            <Box p={2}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                }}>
                <Button variant="contained" color="primary" onClick={() => setDisplay(!display)}>
                    Generate Graph
                </Button>
            </Box>
            {display ?
                <Box p={2}>
                    <Box p={2}
                        //arrange horizontally
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "center",
                        }}
                    >
                        <Stack>
                            <Typography variant="h6">
                                <center>
                                    <h5>Batch wise Distribution</h5>
                                </center>
                            </Typography>
                            <Chart style={{ height: "100px", width: "500px" }} data={batch}>
                                <ArgumentAxis />
                                <ValueAxis />
                                <BarSeries valueField="value" argumentField="argument" />
                                {/* <Title text="Batch wise distribution" /> */}
                            </Chart>
                        </Stack>
                    </Box>
                    <Box p={2}
                        //arrange horizontally
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "center",
                        }}
                    >
                        <Stack>
                            <Typography variant="h6">
                                <center>
                                    <h5>Age wise Distribution</h5>
                                </center>
                            </Typography>
                            <Chart style={{ height: "100px", width: "1000px" }} data={age}>
                                <ArgumentAxis />
                                <ValueAxis />
                                <BarSeries valueField="value" argumentField="argument" />
                            </Chart>
                        </Stack>
                    </Box>
                </Box> : null}
        </div>
    );
};

export default Statistics;