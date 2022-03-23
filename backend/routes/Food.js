var express = require("express");
var router = express.Router();

const FoodItem = require("../models/FoodItem");
// const Vendor = require("../models/Vendors");

router.post("/", function (req, res) {
    FoodItem.find({vendor_email: req.body.vendor_email}, function (error, food) {
        if (error) {
            return res.status(400).send(error);
        } else {
            // return res.send(req.body.vendor_email);
            res.json(food);
        }
    });
});

router.post("/all", function (req, res) {
    FoodItem.find({}, function (error, food) {
        if (error) {
            return res.status(400).send(error);
        } else {
            // return res.send(req.body.vendor_email);
            res.json(food);
        }
    });
});

router.post("/getFood", function (req, res) {
    FoodItem.findOne({_id: req.body.id}, function (error, food) {
        if (error) {
            return res.status(400).send(error);
        } else {
            // return res.send(req.body.vendor_email);
            res.json(food);
        }
    });
});

router.post("/add", function (req, res) {
    let myimg = req.body.image;
    if(req.body.image == "") {
        myimg = undefined;
    }
    var foodItem = new FoodItem({
        vendor_email: req.body.vendor_email,
        name: req.body.name,
        price: req.body.price,
        nonVeg: req.body.nonVeg,
        tag: req.body.tag,
        image: myimg,
        addOnName: req.body.addOnName,
        addOnPrice: req.body.addOnPrice,
        shop_name: req.body.shop_name,
    });
    // return foodItem;
    FoodItem.findOne({ vendor_email: req.body.vendor_email, name: req.body.name }, function (err, food) {
        if (err) {
            return res.status(400).send(err);
        } else {
            if (food) {
                return res.json({
                    message: "Food Item already exists"
                });
            } else {
                foodItem.save()
                    .then(foodItem => {
                        return res.status(200).json({
                            foodItem: foodItem,
                            message: "Food Item added successfully"
                        });
                    })
                    .catch(err => {
                        return res.status(400).send(err);
                    });
            }
        }
    });
});

router.post("/edit", function (req, res) {
    let myimg = req.body.image;

    // return res.send(req.body.image);
    if(req.body.image === "") {
        // return res.send("Hello");

        myimg = undefined;
    }
    FoodItem.findOne({ vendor_email: req.body.vendor_email, _id: req.body.id }, function (err, food) {
        if (err) {
            return res.status(400).send(err);
        } else {
            if (food) {
                // return res.send(myimg);
                food.name = req.body.name,
                food.price = req.body.price,
                food.nonVeg = req.body.nonVeg,
                food.tag = req.body.tag,
                food.image = myimg,
                food.addOnName = req.body.addOnName,
                food.addOnPrice = req.body.addOnPrice
                food.save()
                    .then(foodItem => {
                        return res.status(200).json({
                            foodItem: foodItem,
                            message: "Food Item updated successfully"
                        });
                    })
                    .catch(err => {
                        return res.status(400).send(err);
                    });
            } else {
                return res.json({
                    message: "Food Item does not exist"
                });
            }
        }
    });
});

router.post("/delete", function (req, res) {
    FoodItem.findOne({ vendor_email: req.body.vendor_email, _id: req.body.food_id }, function (err, food) {
        if (err) {
            return res.status(400).send(err);
        } else {
            if (food) {
                food.remove()
                    .then(foodItem => {
                        return res.status(200).json({
                            // foodItem: foodItem,
                            message: "Food Item deleted successfully"
                        });
                    })
                    .catch(err => {
                        return res.status(400).send(err);
                    });
            } else {
                return res.json({
                    message: "Food Item does not exist"
                });
            }
        }
    });
});

module.exports = router;