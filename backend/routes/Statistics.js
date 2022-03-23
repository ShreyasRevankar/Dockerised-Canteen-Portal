var express = require("express");
var router = express.Router();

const Order = require("../models/Order");
const Buyer = require("../models/Buyers");

router.post("/top5", function (req, res) {
    Order.find({vendor: req.body.id}, function (error, order) {
        if (error) {
            return res.status(400).send(error);
        } else {
            // return res.send(req.body.vendor_email);
            var names = {};
            for (var i = 0; i < order.length; i++) {
                if (order[i].status == "Completed") {
                    if (names[order[i].foodItem[1]] == undefined) {
                        names[order[i].foodItem[1]] = order[i].quantity;
                    } else {
                        names[order[i].foodItem[1]] += order[i].quantity;
                    }
                }
            }
            // Create items array
            var items = Object.keys(names).map(function(key) {
                return [key, names[key]];
            });
            
            // Sort the array based on the second element
            items.sort(function(first, second) {
                return second[1] - first[1];
            });
            
            // Create a new array with only the first 5 items
            // console.log(items.slice(0, 5));
            return res.json(items.slice(0, 5));
        }
    });
});

router.post("/counts", function (req, res) {
    Order.find({vendor: req.body.id}, function (error, order) {
        if (error) {
            return res.status(400).send(error);
        } else {
            var placed = 0, completed = 0, pending = 0, rejected = 0;
            for (var i = 0; i < order.length; i++) {
                if (order[i].status === "Completed") {
                    completed++;
                } else if (order[i].status === "Rejected") {
                    rejected++;
                } else {
                    pending++;
                }
                placed++;
            }
            return res.json({
                placed: placed,
                completed: completed,
                pending: pending,
                rejected: rejected
            });
        }
    });
});

router.post("/batch", function (req, res) {
    batch_map = {};
    Buyer.find({}, function (error, buyer) {
        if (error) {
            return res.status(400).send(error);
        } else {
            for (var i = 0; i < buyer.length; i++) {
                batch_map[buyer[i]._id] = buyer[i].batch;
            }
        }
    });
    Order.find({vendor: req.body.id}, function (error, order) {
        if (error) {
            return res.status(400).send(error);
        } else {
            var batch = [0, 0, 0, 0, 0];
            // var found_ids = {}
            for (var i = 0; i < order.length; i++) {
                if (order[i].status === "Completed") {
                    batch[batch_map[order[i].buyer[0]] - 1] += 1;
                }
            }
            return res.json(batch);
            // Create items array
            // var items = Object.keys(batch).map(function(key) {
            //     return [key,
        }
    });
});


router.post("/age", function (req, res) {
    batch_map = {};
    Buyer.find({}, function (error, buyer) {
        if (error) {
            return res.status(400).send(error);
        } else {
            for (var i = 0; i < buyer.length; i++) {
                batch_map[buyer[i]._id] = buyer[i].age - 1;
            }
            // return res.json(batch_map);
        }
    });
    Order.find({vendor: req.body.id}, function (error, order) {
        if (error) {
            return res.status(400).send(error);
        } else {
            var batch = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            // var found_ids = {}
            var newAges = [];
            for (var i = 0; i < order.length; i++) {
                if (order[i].status === "Completed") {
                    let reduced_age = batch_map[order[i].buyer[0]] / 10;
                    batch[Math.floor(reduced_age)] += 1;
                    newAges.push(reduced_age);
                }
            }
            return res.json(batch);
            // Create items array
            // var items = Object.keys(batch).map(function(key) {
            //     return [key,
        }
    });
});

module.exports = router;