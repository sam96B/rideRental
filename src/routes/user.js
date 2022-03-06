const router = require("express").Router();
const Model = require("../models/user");
const ModelRole = require("../models/role");


router.post("/", (req, res, next) => {
    const { name, address, password, email, username, phone } = req.body;
    Model.create({
        name: name,
        address: address,
        discount: 0,
        total_payment: 0,
        role_id: 1,
        password: password,
        email: email,
        username: username,
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
        where: {
            deletedAt: null
        },
        // attributes: ["id", "type"],
        include: ModelRole
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
        role_id: req.query.role,
    }, {
        where: {
            id: req.query.id,
        },
    }).then(result => {
        res.status(200).json(result );
    }).catch( err => {
        res.status(500).json(err);

    });
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