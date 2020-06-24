var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');



conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en clientesleercod");
    } else {
        console.log("no se conecto en clientesleerdesc");
    }
});



var router = express();

router.get('/', async function (req, res) {
    console.log('clientesdesc')
    indice = req.query.id;
    var q = ['SELECT idClientes, ClientesDesc FROM BasesGenerales.Clientes'].join(' ')
    console.log(q)
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