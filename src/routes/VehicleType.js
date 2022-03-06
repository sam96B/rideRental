const router = require("express").Router();
const Model = require("../models/vehicleType");
const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: "./images",
    filename: function (req, file, cb) {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
}).single("image");


router.post("/", upload, (req, res, next) => {
    // res.send(req.file.path)
    console.log(req.file.path)
    const ppath = '/images/' + req.file.path.split('\\')[1]
    console.log(ppath)
    const { type } = req.body;
    Model.create({
        photo: req.file.path,
        type: type,
    }).then((result) => {
        res.status(200).json(result);
        console.log("doneeeeeeeeeeeeeeeeeeeeeeee");
    }).catch((err) => {
        res.status(200).json(err);

        console.log(err);
        console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    });
});

router.get("/", async (req, res, next) => {
    const roles = await Model.findAll({
        where: {
            deletedAt: null
        },
        attributes: ["id", "type"],
    });
    res.status(200).json(roles);
});

router.put("/", async (req, res, next) => {
    const role = await Model.update({
        type: req.body.type,
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