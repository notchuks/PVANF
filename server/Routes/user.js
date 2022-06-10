const router = require("express").Router();
const User = require("../models/User");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

// UPDATE USER DETAILS
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    // encrypt user password after fetching from db
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE USER
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        // Remove passwprd from user deets & return the rest
        const { password, ...others } = user._doc;

        res.status(200).json(others);

    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {

    // if in our params there is a query new=true, const query will have a true value
    const query = req.query.new;

    try {
        // if query = true fetch the last 5 registered users( sort({_id:-1}) does this ) else just return all users.
        const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find();

        res.status(200).json(users);
        
    } catch (err) {
        res.status(500).json(err);
    }
});

// USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    // get Last year's date
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            // match the condition to return all users who signed up greater than lastyear i.e all that signed up this year.
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    // take the month num each from each user's createdAt value. 
                    month: { $month: "$createdAt" },
                },
            },
            {
                // group the data in months i.e each month is the id of that group of users that created accounts that month & total sums up all the users signed up that month.
                $group: {
                    // the $month variable created above.
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;