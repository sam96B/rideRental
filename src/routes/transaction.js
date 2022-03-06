const router = require("express").Router();
const sequelize = require("../database/config/database");
const Model = require("../models/transaction");
const vec_tran = require("../models/vecTran");
const Code = require("../models/vehicleCode");
// const sequelize = require("sequelize")
router.post("/", async (req, res, next) => {
    const { user_id, amount, end_date, start_date, vehicles } = req.body;

    try {
        const result = await sequelize.transaction(async (t) => {
            let transaction = await createTransaction(user_id, amount, end_date, start_date, t)
            // throw "asdfasdf"
            const ids = await getIds(vehicles)
            const arr = [];
            for (let i = 0; i < ids.length; i++) {
                arr.push({ transactionId: transaction.id, vehicleCodeId: ids[i] });
            }
            const updated = await updateVehicle(ids, t);
            const test = await vec_tran.bulkCreate(arr, { transaction: t }).catch(err => { res.status(500).json(err) })
            res.status(200).json(transaction)
        });
    } catch (error) {
        res.status(500).json(error)
    }
})
async function updateVehicle(ids, t) {
    for (let i = 0; i < ids.length; i++) {
        await Code.update({
            status: 'rented'
        }, {
            where: {
                id: ids[i]
            },
            transaction: t
        }).catch(err => {
            throw err
        })
    }
    return "dones"
}
async function createTransaction(user_id, amount, end_date, start_date, t) {
    const model = await Model.create({
        start_date: start_date,
        end_date: end_date,
        amount: amount,
        user_id: user_id,
        status: 'pending'
    }, { transaction: t })
        .catch((err) => {
            res.status(500).json(err);
        });
    return model
}

async function getIds(vehicles) {

    const arr = [];
    for (let i = 0; i < vehicles.length; i++) {
        let vec = await Code.findAll({
            attributes: ["id"],
            where: {
                status: 'available',
                vehicle_id: vehicles[i].vId
            },
            limit: vehicles[i].quantity
        })
        for (let j = 0; j < vec.length; j++) {
            arr.push(vec[j].id)
        }
    }
    return arr
}

router.get("/", (req, res, next) => {
    Model.findAll({
        attributes: ["id", "status"],
        include: {
            model: vec_tran,
            include: Code,
            // attributes: ["id", "code", "status"],
        }
    })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

// router.put("/", async(req, res, next) => {
//     Model.update({
//             type: req.body.type,
//         }, {
//             where: {
//                 id: req.query.id,
//             },
//         })
//         .then((value) => {
//             res.status(200).json(value);

//         })
//         .catch((err) => {
//             res.status(500).json(err);
//         });
// });

// router.delete("/", async(req, res) => {
//     Model.destroy({
//         where: {
//             id: req.query.id,
//         },
//     }).then((value) => {
//         res.status(200).json(value);

//     }).catch((err) => {
//         res.status(500).json(err);
//     });
// });

module.exports = router;

module.exports = router;