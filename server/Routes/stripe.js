const router = require("express").Router();
const stripe = require("stripe")("sk_test_51L6BMwKt5nOB3xoQXlDcXTs8A5xjoRjygK44b5SLkQ967oovJtu1pKpOT5jHP6vLuCDT5HIJTEl9HjRRP2m3bdFB00Ic0YrNaL");

router.post("/payment", (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).json(stripeErr);
        } else {
            res.status(200).json(stripeRes);
        }
    });
});


module.exports = router;