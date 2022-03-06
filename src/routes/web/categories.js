const webIsAuth = require("../../middlewares/web-is-Auth");
const Vehicle = require("../../models/vehicle");
const VehicleType = require("../../models/vehicleType");
const VehicleCode = require("../../models/vehicleCode");
const Transaction = require("../../models/transaction");

const router = require("express").Router();

router.get("/bicycles/:id", webIsAuth, (req, res) => {
    // res.send(req.params) 
    VehicleType.findAll({
        where: {
            id: req.params.id,
        },
        include: {
            model: Vehicle,
        },
        raw: true,
        // nest: true,
    })
        .then(result => {
            const arr = []
            let i = 0
            // res.json(result[0]["type"])
            if (result[0]["vehicles.id"] == null) {
                res.render("user/bicycles", {
                    layout: "main",
                    isLoggedIn: req.isLoggedIn,
                    name: req.name,
                    total_payment: req.total_payment,
                    discount: req.discount,
                    hasData: false,
                    type_id: req.params.id,
                    type_name: result[0]["type"]
                });
            } else {
                result.forEach(element => {
                    if(element["vehicles.deletedAt"] == null){
                        arr.push({
                            i: i++,
                            id: element["vehicles.id"],
                            charge: element["vehicles.charge"],
                            photo: element["vehicles.photo"],
                            capacity: element["vehicles.capacity"],
                        })
                    }
                });


                res.render("user/bicycles", {
                    layout: "main",
                    isLoggedIn: req.isLoggedIn,
                    name: req.name,
                    total_payment: req.total_payment,
                    discount: req.discount,
                    result: arr,
                    hasData: true,
                    type_id: req.params.id,
                    type_name: result.type

                });
            }

        })

});

router.get('/bicycles/search/:id', webIsAuth, (req, res) => {
    // res.json("asdf")
    VehicleType.findAll({
        where: {
            id: req.params.id
        },
        include: {
            model: Vehicle,
            where: {
                deletedAt: null
            },
            include: {
                model: VehicleCode,
                include: {
                    model: Transaction,
                }
            }
        }
    }).then(data => {
        const result = getData(data, req.query)
        res.render("user/bicycles", {
            layout: "main",
            isLoggedIn: req.isLoggedIn,
            name: req.name,
            total_payment: req.total_payment,
            discount: req.discount,
            result: result,
            hasData: true,
            type_id: req.params.id,
            type_name: data.type


        });
    })
})


function getData(data, filter) {
    const query = data[0].vehicles
    const arr = []
    for (let i = 0; i < query.length; i++) {
        let element = query[i];
        if ((element.charge >= filter.price && element.charge <= (parseInt(filter.price) + 10))) {

            console.log(element.charge + " price: " + filter.price + "max: " + (filter.price + 10))
            const count = check(element, filter)
            if (count) {
                arr.push({ id: element.id, charge: element.charge, capacity: count, photo: element.photo, })
            }
        }
    }
    return arr
}
function check(params, dates) {
    let count = 0
    const codes = params.vehicle_codes
    for (let i = 0; i < codes.length; i++) {
        if (codes[i].transactions.length == 0) {
            // console.log(codes[i].transactions)
            count++
        } else {
            // console.log(codes[i].transactions)
            for (let j = 0; j < codes[i].transactions.length; j++) {
                const element = codes[i].transactions[j];
                // console.log("element.start_date: " +element.start_date + "\ndates.end_date: "+ dates.end_date)
                // console.log("element.end_date: " +element.end_date + "\ndates.start_date: "+ dates.start_date)
                // console.log(element.start_date > dates.end_date || element.end_date < dates.start_date)
                if (element.start_date > dates.end_date || element.end_date < dates.start_date) {
                    // console.log("success")
                    count++
                }
            }
        }
    }
    // console.log("count: " + count)

    return count
}



module.exports = router;
