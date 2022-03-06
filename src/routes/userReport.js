const router = require("express").Router();
const Model = require("../models/userReport");

router.post("/", (req, res, next) => {
    const { message, user_id } = req.body;
    Model.create({
            message: message,
            user_id: user_id
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
            // attributes: ["id", "type"],
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

router.delete("/", (req, res) => {
    Model.destroy({
        where: {
            id: req.query.id,
        },
    }).then((value) => {
        res.status(200).json(value);

    }).catch((err) => {

        res.status(500).json(err);
    });
});

module.exports = router;