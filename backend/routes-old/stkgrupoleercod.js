var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('./conexion');


conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en stkgrupoleercod");
    } else {
        console.log("no se conecto en stkgrupoleercod");
    }
});




var router = express();

router.get('/', async function(req, res, next) {
    indice = req.query.id;
    conexion.query('Select * from StkGrupo  where idStkGrupo = ' + indice,
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });

});

module.exports = router;