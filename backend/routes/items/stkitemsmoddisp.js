var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');


conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en stkitemsmoddisp");
    } else {
        console.log("no se conecto en stkitemsmoddisp");
    }
});

/*
idStkItems
*/

var router = express();



router.post('/', async function(req, res, next) {
 //?:id/?:id2
var CantDisp = 0.00
var idStkItems = req.query.id1;
var StkItemsGrupo = req.query.id2;
var StkItemsRubro = req.query.id3;
var StkItemsCantDisp = req.body.StkItemsCantDisp;
var total = req.body.total;
CantDisp = Number(StkItemsCantDisp) - total

var d = new Date()
finalDate = d.toISOString().split('T')[0]
var StkItemsFAct = finalDate;
// Desde Postman http://localhost:4000/stkitemsmodificar?id1=1&id2=1&id3=1
 
    conexion.query('UPDATE StkItems SET StkItemsCantDisp = ' + CantDisp + 
                                     ', StkItemsFAct = "'+ StkItemsFAct + 
                                      '" WHERE idStkItems = ' + idStkItems + ' and  StkItemsGrupo = ' + StkItemsGrupo + ' and  StkItemsRubro = ' + StkItemsRubro,
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
                };
            });
        });


module.exports = router;