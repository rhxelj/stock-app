var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');


conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en modprecios");
    } else {
        console.log("no se conecto en modprecios");
    }
});

var router = express();

router.post('/', async function(req, res, next) {

var idProveedores = req.body.idProveedores;
var idStkGrupo = req.body.idStkGrupo;

var importemod = req.body.importemod;
var porcentmod = req.body.porcentmod;

if (idProveedores != 0 && importemod != 0)
 {
    conexion.query('UPDATE StkRubro SET StkRubroCosto =  StkRubroCosto + ' + importemod + ' WHERE StkRubroProv = '  + idProveedores,
    function(err, result) {
        if (err) {
            console.log('Error en UPDATE modprecios en  (idProveedores != 0 && importemod != 0)');
            console.log(err); 

        } else {
            res.json(result);
        }
    });
 }
 if (idProveedores == 0 && importemod != 0)
 {
    conexion.query('UPDATE StkRubro SET StkRubroCosto =  StkRubroCosto + ' + importemod + ' WHERE StkRubroCodGrp = '  + idStkGrupo,
    function(err, result) {
        if (err) {
            console.log('Error en UPDATE modprecios en  (idProveedores === 0 && importemod != 0)');
            console.log(err); 

        } else {
           
            res.json(result);
        }
    });
 }
 if (idProveedores != 0 && importemod == 0)
 {
    conexion.query('UPDATE StkRubro SET StkRubroCosto =  StkRubroCosto + (StkRubroCosto * ' + porcentmod / 100 +  ') WHERE StkRubroProv = '  + idProveedores,
    function(err, result) {
        if (err) {
            console.log('Error en UPDATE modprecios en  (idProveedores != 0 && importemod == 0)');
            console.log(err); 

        } else {
            res.json(result);
        }
    });
 }
 if (idProveedores == 0 && importemod == 0)
 {
    conexion.query('UPDATE StkRubro SET StkRubroCosto =  StkRubroCosto + (StkRubroCosto * ' +  porcentmod / 100 +  ') WHERE StkRubroCodGrp = '  + idStkGrupo,
    function(err, result) {
        if (err) {
            console.log('Error en UPDATE modprecios en (idProveedores == 0 && importemod == 0)');
            console.log(err); 

        } else {
           
            res.json(result);
        }
    });
 }
})

module.exports = router;