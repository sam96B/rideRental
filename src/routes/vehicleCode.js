const router = require("express").Router();
const Model = require("../models/vehicleCode");

// router.post("/", (req, res, next) => {
//     const { type } = req.body;
//     Model.create({
//             type: type,
//         })
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             res.send(err);
//         });
// });

router.get("/", (req, res, next) => {
    Model.findAll({
        // attributes: ["id", "type"],
        where: {
            deletedAt: null,
            status: 'rented'
        },
    })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.put("/", async (req, res, next) => {
    const role = await Model.update({
        status: 'available',
    }, {
        where: {
            id: req.query.id,
        },
    });
    res.status(200).json(role);
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