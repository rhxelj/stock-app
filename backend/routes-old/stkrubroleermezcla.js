var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('./conexion');


conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en stkrubroleermezcla");
    } else {
        console.log("no se conecto en stkrubroleermezcla");
    }
});




var router = express();

router.get('/', function(req, res, next) {
  
    conexion.query('Select idStkRubro, StkRubroCodGrp, StkRubroDesc, StkGrupo.StkGrupoDesc, StkRubroAbr, StkRubroProv, Proveedores.ProveedoresDesc, StkRubroAncho, StkRubroPresDes, StkRubroPres, StkRubroUM, StkRubroCosto, StkRubroTM from StkRubro JOIN StkGrupo, BasesGenerales.Proveedores where StkRubroCodGrp = idStkGrupo and StkRubroProv = idProveedores' ,
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });
  

});

module.exports = router;