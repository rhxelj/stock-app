var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');


conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en stkrubroleermezcla");
    } else {
        console.log("no se conecto en stkrubroleermezcla");
    }
});

var router = express();

router.get('/', function(req, res, next) {
  
    conexion.query('Select idStkRubro, StkRubroCodGrp, StkGrupo.StkGrupoDesc, StkRubroDesc, StkRubroCosto, StkRubroTM, ' +
                     '(StkRubroCosto * StkMonedasCotizacion * 2.15) as PPub, (StkRubroCosto * StkMonedasCotizacion * 1.77) as PMay, '+ 
                    '((StkRubroCosto * StkMonedasCotizacion * 1.77) + (REPValorMOT/60*1.3)) as PMayPU, ' + 
                    '((StkRubroCosto * StkMonedasCotizacion * 1.77) + (REPValorMOT/60*1.3*2)) as PMayPUR ' + 
                     'from StkRubro JOIN StkGrupo, BasesGenerales.Proveedores, StkMonedas, ' + 
                     'reparacion.parametrosrep where StkRubroCodGrp = idStkGrupo and StkRubroProv = idProveedores ' + 
                     'and StkRubroTM = idStkMonedas order by StkRubroCodGrp',
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });
  

});

module.exports = router;