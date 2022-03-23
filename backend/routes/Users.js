var express = require("express");
var router = express.Router();

// Load User model
const Buyer = require("../models/Buyers");
const Vendor = require("../models/Vendors");
// const Buyer = require("../models/Users")(Buyer);
// const Vendor = require("../models/Users")(Vendor);

// GET request 
// Getting all the users
// router.get("/", function(req, res) {
//     User.find(function(err, users) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			res.json(users);
// 		}
// 	})
// });

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
// router.post("/register", (req, res) => {
//     const newUser = new User({
//         name: req.body.name,
//         email: req.body.email,
//         date: req.body.date
//     });

//     newUser.save()
//         .then(user => {
//             res.status(200).json(user);
//         })
//         .catch(err => {
//             res.status(400).send(err);
//         });
// });

router.post("/signUpBuyer", (req, res) => {
    const newBuyer = new Buyer({
        name: req.body.name,
        email: req.body.email,
        contact_number: req.body.contact_number,
        password: req.body.password,
        age: req.body.age,
        batch: req.body.batch,
        // date: req.body.date
    });
    const email = req.body.email;
    var mbool = false;

    // Vendor.findOne({ email: email }, function (err, vendor) {
    //     if (err) {
    //         // console.log(err);
    //     } else {
    //         if (vendor) {
    //             mbool = true;
    //             return res.send("vendor");
    //         }
    //     }
    // });

    Vendor.findOne({ email: email })
        .then(vendor => {
            if (vendor) {
                mbool = true;
                return res.send("vendor");
            } else {
                Buyer.findOne({ email: email })
                    .then(buyer => {
                        if (buyer) {
                            mbool = true;
                            return res.send("buyer");
                        } else {
                            newBuyer.save()
                                .then(buyer => {
                                    res.status(200).json(buyer);
                                })
                                .catch(err => {
                                    res.status(400).send(err);
                                });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        })
        .catch(err => {
            console.log(err);
        });

    // Buyer.findOne({ email: email }, function (err, buyer) {
    //     if (err) {
    //         // console.log(err);
    //     } else {
    //         if (buyer) {
    //             mbool = true;
    //             return res.send("buyer");
    //         }
    //     }
    // });
    // if(mbool === false){
    //     Buyer.findOne({ email: email })
    //         .then(buyer => {
    //             if (buyer) {
    //                 mbool = true;
    //                 return res.send("buyer");
    //             } else {
    //                 newBuyer.save()
    //                     .then(buyer => {
    //                         res.status(200).json(buyer);
    //                     })
    //                     .catch(err => {
    //                         res.status(400).send(err);
    //                     });
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }

    // console.log("ln");

    // if(mbool === false) {
    // newBuyer.save()
    //     .then(user => {
    //         return res.status(200).json(user);
    //     })
    //     .catch(err => {
    //         return res.status(408).send(err);
    //     });
    // }
    // res.send("Working");
});

router.post("/signUpVendor", (req, res) => {
    const newVendor = new Vendor({
        name: req.body.name,
        email: req.body.email,
        contact_number: req.body.contact_number,
        password: req.body.password,
        shop_name: req.body.shop_name,
        opening_time: req.body.opening_time,
        closing_time: req.body.closing_time,
        // date: req.body.date
    });

    console.log(newVendor.first_name);
    const email = req.body.email;
    const mbool = false;

    Vendor.findOne({ email: email }, function (err, vendor) {
        if (err) {
            console.log(err);
        } else {
            if (vendor) {
                return res.send("vendor");
                // mbool = true;
            }
        }
    });

    Buyer.findOne({ email: email }, function (err, buyer) {
        if (err) {
            console.log(err);
        } else {
            if (buyer) {
                return res.send("buyer");
                // mbool = true;
            }
        }
    });

    if (mbool == false) {
        newVendor.save()
            .then(user => {
                return res.status(200).json(user);
            })
            .catch(err => {
                return res.status(400).send(err);
            });
    }

});

// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    // Find user by email
    // const founded = false;
    Buyer.findOne({ email: email })
        .then(user => {
            // Check if user email exists
            if (user) {
                // return res.send("buyer");
                // Check if password is correct
                if (user.password === req.body.password) {
                    // Return user details
                    return res.json({
                        user: user,
                        user_type: "buyer"
                    });
                    // founded = true;
                } else {
                    // return res.status(408).json({ message: "Incorrect password!" });
                    return res.json({ user: "", message: "Incorrect password!" });
                }
            } else {
                Vendor.findOne({ email: email })
                    .then(user => {
                        // Check if user email exists
                        if (user) {
                            // Check if password is correct
                            if (user.password === req.body.password) {
                                // Return user details
                                return res.json({
                                    user: user,
                                    user_type: "vendor"
                                });
                                // founded = true;
                            } else {
                                return res.json({ user: "", message: "Incorrect password!" });
                            }
                        } else {
                            return res.json({ user: "", message: "User not found!!" });
                        }

                    })
            }

        })
    // .catch(err => {
    //     res.status(400).json({ message: "User not found!" });
    // });
    // if (!founded) {
    //     Vendor.findOne({ email: email })
    //         .then(user => {
    //             // Check if user email exists
    //             if (user) {
    //                 // Check if password is correct
    //                 if (user.password === req.body.password) {
    //                     // Return user details
    //                     return res.json(user);
    //                     founded = true;
    //                 } else {
    //                     return res.status(400).json({ message: "Incorrect password!" });
    //                 }
    //             } else {
    //                 return res.status(400).json({ message: "User not found!" });
    //             }

    //         })
    //         .catch(err => {
    //             return res.status(400).json({ message: "User not found!" });
    //         });
    // }
});

module.exports = router;
