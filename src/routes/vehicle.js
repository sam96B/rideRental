const router = require("express").Router();
const Model = require("../models/vehicle");
const Type = require("../models/vehicleType");
const Brand = require("../models/brand");
const Code = require("../models/vehicleCode");
const multer = require('multer');
const path = require("path");
const VehicleCode = require("../models/vehicleCode");
// Create multer object

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
    const ppath = '/images/' + req.file.path.split('\\')[1]
    const { capacity, charge, brand, vehicleType, code } = req.body;
    Model.create({
        code: code,
        capacity: capacity,
        charge: charge,
        photo: ppath,
        brandId: brand,
        vehicleTypeId: vehicleType,
    })
        .then((result) => {
            for (let i = 1; i < capacity; i++) {
                Code.create({
                    vehicle_id: result.id,
                    status: 'available',
                    code: code + "-" + i,
                })
                    .catch((err) => {
                        res.send(err);

                    });
            }
            return result;
        })
        .then((value) => {
            res.send(value);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});

router.get("/", async (req, res, next) => {
    const variable = await Model.findAll({
        where: {
            deletedAt: null
        },
        // attributes: ["id", "type"],
        include: [{
            model: Type,
        },
        {
            model: Brand,
        },
        ],
    })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log("mr mn hona2");

            res.status(500).send(err);
        });
});

router.put("/", upload, async (req, res, next) => {
    const { charge } = req.body;
    Model.update({
        charge: charge,
    }, {
        where: {
            id: req.query.id,
        },
    })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
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
            VehicleCode.update({
                deletedAt: new Date().toUTCString(),
            }, {
                where: {
                    vehicle_id: req.query.id,
                },
            })
            res.status(200).json(value);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});



module.exports = router;