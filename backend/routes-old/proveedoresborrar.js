var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('./conexion');
var mysql = require('mysql');

var router = express();
conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en proveedoresborrar");
    } else {
        console.log("no se conecto en proveedoresborrar");
    }
});


router.delete('/', async function(req, res) {
 indice = req.query.id;

  conexion.query('delete from BasesGenerales.Proveedores where idProveedores = ' + indice, 
  function(err, result) {
    if (err) {
        if (err.errno == 1451) 
            {
              return res.status(411).send({message : "error Código de proveedor usado en otra tabla"});
             }
          {
        console.log(err);
          }
    } 
    else {
        res.json(result.rows);
    }
}); 
                                    });   

module.exports = router;
