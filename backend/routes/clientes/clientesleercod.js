var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');



conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en clientesleercod");
    } else {
        console.log("no se conecto en clientesleercod");
    }
});




var router = express();

router.get('/', async function (req, res) {
    indice = req.query.id;
    var q = ['SELECT * FROM BasesGenerales.Clientes where idClientes = ' + indice].join(' ')
    conexion.query(q,
        function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });

});
conexion.end;
module.exports = router;