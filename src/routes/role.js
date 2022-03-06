const router = require("express").Router();
// const Model = require("../models/Role");
const Model = require('../models/role')

router.post("/", (req, res, next) => {
    const { type } = req.body;
    Model.create({
            type: type,
        })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.get("/", (req, res, next) => {
    Model.findAll({
            attributes: ["id", "type"],
        })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.put("/", async(req, res, next) => {
    const role = await Model.update({
        type: req.body.type,
    }, {
        where: {
            id: req.query.id,
        },
    });
    res.status(200).json(role);
});

router.delete("/", async(req, res) => {
    role = await Model.destroy({
        where: {
            id: req.query.id,
        },
    });
    res.status(200).json(role);
});

module.exports = router;