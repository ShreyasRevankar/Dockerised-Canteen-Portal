var express = require("express");
const FoodItem = require("../models/FoodItem");
var router = express.Router();

const Order = require("../models/Order");

router.post("/vendor", function (req, res) {
    Order.find({vendor: req.body.vendor}, function (error, order) {
        if (error) {
        return res.status(400).send(error);
        } else {
        // return res.send(req.body.vendor_email);
        res.json(order);
        }
    });
});


router.post("/buyer", function (req, res) {
    Order.find({buyer: req.body.buyer}, function (error, order) {
        if (error) {
        return res.status(400).send(error);
        } else {
        // return res.send(req.body.vendor_email);
        res.json(order);
        }
    });
});

router.post("/add", function (req, res) {
    var order = new Order({
        buyer: req.body.buyer,
        foodItem: req.body.foodItem,
        vendor: req.body.vendor,
        quantity: req.body.quantity,
        totalPrice: req.body.totalPrice,
        addOns: req.body.addOns,
    });
    order.save()
        .then(order => {
            return res.status(200).json({
                order: order,
                message: "Order added successfully"
            });
        })
        .catch(err => {
            return res.status(400).send(err);
        });
});

router.post("/updateStatus", function (req, res) {
    Order.findOne({_id: req.body.id}, function (error, order) {
        if (error) {
            return res.status(400).send(error);
        } else {
            order.status = req.body.status;
            order.save()
                .then(order => {
                    return res.status(200).json({
                        order: order,
                        message: "Order updated successfully"
                    });
                })
                .catch(err => {
                    return res.status(400).send(err);
                });
        }
    });
});

router.post("/updateRating", function (req, res) {
    Order.findOne({_id: req.body.id}, function (error, order) {
        if (error) {
            return res.status(400).send(error);
        } else {
            var totalRating = req.body.rating;
            var totalOrders = 1;
            order.rating = req.body.rating;
            Order.find({foodItem: order.foodItem, status: "Completed"}, function (error, orders) {
                if(error) {
                    return res.status(400).send(error);
                } else {
                    for (var i = 0; i < orders.length; i++) {
                        if (orders[i].rating > 0) {
                            totalRating += orders[i].rating;
                            totalOrders++;
                        }
                    }
                }
            });
            FoodItem.findOne({_id: order.foodItem[0]}, function (error, foodItem) {
                if(error) {
                    return res.status(400).send(error);
                } else {
                    foodItem.rating = totalRating / totalOrders;
                    foodItem.save()
                }
            });
            order.save()
                .then(order => {
                    return res.status(200).json({
                        order: order,
                        message: "Order updated successfully"
                    });
                })
                .catch(err => {
                    return res.status(400).send(err);
                });
        }
    });
});

module.exports = router;