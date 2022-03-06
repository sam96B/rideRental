const router = require("express").Router();
const Brand = require("../models/brand");




router.post("/", (req, res, next) => {
    const { name } = req.body;
    Brand.create({
        name: name,
    })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.get("/", async (req, res, next) => {
    const brands = await Brand.findAll({
        attributes: ["id", "name"],
        where: {
            deletedAt: null
        },
    });
    // console.log(req.path)
    res.status(200).json(brands);
});

router.put("/", async (req, res, next) => {
    const brand = await Brand.update({
        name: req.body.name,
    }, {
        where: {
            id: req.query.id,
        },
    });
    res.status(200).json(brand);
});

router.delete("/", async (req, res) => {
    Model.update({
        deletedAt: new Date().toUTCString(),
    }, {
        where: {
            id: req.query.id,
        },
    })
        .then((value) => {
            res.status(200).json(value);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});


module.exports = router;