const router = require("express").Router();
const Product = require("../models/Product");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

// CREATE PRODUCTS
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE PRODUCT
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedProduct = await User.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE PRODUCT
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET PRODUCT (no need for any verifytoken (or authenticate or admin) cuz all users can view products)
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        res.status(200).json(product);

    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL PRODUCTS (Todos puedemos ver productos)
router.get("/", async (req, res) => {

    const qNew = req.query.new;
    const qCategory = req.query.category;

    try {

        let products;

        if (qNew) {
            // return the newest created products. limit gives the maximum no.
            products = await Product.find().sort({createdAt: -1}).limit(1);
        } else if (qCategory) {
            products = await Product.find({
                // if the value of qCategories is in our array categories of that product, return that product.
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            // if no query just return all products.
            products = await Product.find();
        }

        res.status(200).json(products);
        
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;