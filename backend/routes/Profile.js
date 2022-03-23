var express = require("express");
var router = express.Router();

// Load User model
const Buyer = require("../models/Buyers");
const Vendor = require("../models/Vendors");

router.post("/buyer", function (req, res) {
    Buyer.findOne({ email: req.body.email }, function (err, buyer) {
        if (err) {
            console.log(err);
        } else {
            return res.json({
                name: buyer.name,
                email: buyer.email,
                contact_number: buyer.contact_number,
                age: buyer.age,
                batch: buyer.batch,
                money: buyer.money,
                fav: buyer.fav
            });
        }
    });
});

router.post("/vendor", function (req, res) {
    Vendor.findOne({ email: req.body.email }, function (err, vendor) {
        if (err) {
            console.log(err);
        } else {
            return res.json({
                _id: vendor._id,
                name: vendor.name,
                email: vendor.email,
                contact_number: vendor.contact_number,
                shop_name: vendor.shop_name,
                opening_time: vendor.opening_time,
                closing_time: vendor.closing_time,
            });
        }
    });
});

router.post("/vendor_update", function (req, res) {
    Vendor.findOne({ email: req.body.email }, function (err, vendor) {
        if (vendor) {
            vendor.name = req.body.name;
            vendor.email = req.body.email;
            vendor.contact_number = req.body.contact_number;
            // vendor.shop_name = req.body.shop_name;
            vendor.opening_time = req.body.opening_time;
            vendor.closing_time = req.body.closing_time;
            vendor.password = vendor.password;
            vendor.save()
                .then(user => {
                    return res.status(200).json(user);
                })
                .catch(err => {
                    return res.status(400).send(err);
                });
        } else if(err) {
            return res.status(400).send(err);
        } else {
            return res.send(req.body);
        }
    });
});


router.post("/buyer_update", function (req, res) {
    Buyer.findOne({ email: req.body.email }, function (err, buyer) {
        // return res.send(req.body);
        if (buyer) {
            buyer.name = req.body.name;
            buyer.email = req.body.email;
            buyer.contact_number = req.body.contact_number;
            buyer.age = req.body.age;
            buyer.batch = req.body.batch;
            buyer.password = buyer.password;
            buyer.save()
                .then(user => {
                    return res.status(200).json(user);
                })
                .catch(err => {
                    return res.status(400).send(err);
                });
        } else if(err) {
            return res.status(400).send(err);
        } else {
            return res.send(req.body);
        }
    });
});

router.post("/buyer_update_money", function (req, res) {
    Buyer.findOne({ _id: req.body.id }, function (err, buyer) {
        if (buyer) {
            buyer.money = parseInt(req.body.money) + parseInt(buyer.money);
            buyer.save()
                .then(user => {
                    return res.status(200).json(user);
                })
                .catch(err => {
                    return res.status(400).send(err);
                });
        } else if(err) {
            return res.status(400).send(err);
        } else {
            return res.send(req.body);
        }
    });
});

router.post("/updateFav", function (req, res) {
    Buyer.findOne({ _id: req.body.id }, function (err, buyer) {
        if (buyer) {
            if(buyer.fav.indexOf(req.body.food) == -1) {
                buyer.fav.push(req.body.food);
            } else {
                buyer.fav.splice(buyer.fav.indexOf(req.body.food), 1);
            }
            buyer.save()
                .then(user => {
                    return res.status(200).json(user);
                })
                .catch(err => {
                    return res.status(400).send(err);
                });
        } else if(err) {
            return res.status(400).send(err);
        } else {
            return res.send(req.body);
        }
    });
});

router.post("/getTimes", function (req, res) {
    Vendor.find({}, function (err, vendors) {
        if (err) {
            console.log(err);
        } else {
            return res.json(vendors);
        }
    });
});

router.post("/buyerAll" , function (req, res) {
    Buyer.find({}, function (err, buyers) {
        if (err) {
            console.log(err);
        } else {
            return res.json(buyers);
        }
    });
});

module.exports = router;