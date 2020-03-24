var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');




conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en proveedoresleer");
    } else {
        console.log("no se conecto en proveedoresleer");
    }
});




var router = express();

router.get('/', async function(req, res, next) {
    console.log(req.query.id1)
    console.log(req.query.id2)
    var a = ''
    var b = ''
    var c = ''
    var d = ''
    var e = ''
    if (req.query.id1 != '')
        a = req.query.id1
    if (req.query.id2 != '')
        b = ', ' + req.query.id2
    if (req.query.id3 != '')
        c = ', ' + req.query.id3
    if (req.query.id4 != '')
        d = ', ' + req.query.id4
    if (req.query.id5 != '')
        e = ', ' + req.query.id5        
  
      var orden = 'idProveedores'
     var sentsql = 'select ' + a + b +  c + d + e +' from BasesGenerales.Proveedores JOIN BasesGenerales.SubRubros where BasesGenerales.Proveedores.ProveedoresTipo = BasesGenerales.SubRubros.idSubRubro order by ' + orden
      conexion.query(sentsql,
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });
        
});
conexion.end;

module.exports = router;