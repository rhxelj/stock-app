var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');
var param = require('../parametros')

conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en stkrubroleermezcla");
    } else {
        console.log("no se conecto en stkrubroleermezcla");
    }
});

var router = express();
/*
'Select idStkRubro, StkRubroCodGrp, StkGrupo.StkGrupoDesc, StkRubroDesc, StkRubroCosto, StkRubroTM, ' +
                     '(StkRubroCosto * StkMonedasCotizacion * 2.15) as PPub, (StkRubroCosto * StkMonedasCotizacion * 1.77) as PMay, '+ 
                    '((StkRubroCosto * StkMonedasCotizacion * 1.77) + (REPValorMOT/60*1.3)) as PMayPU, ' + 
                    '((StkRubroCosto * StkMonedasCotizacion * 1.77) + (REPValorMOT/60*1.3*2)) as PMayPUR ' + 
                     'from StkRubro JOIN StkGrupo, BasesGenerales.Proveedores, StkMonedas, ' + 
                     'reparacion.parametrosrep where StkRubroCodGrp = idStkGrupo and StkRubroProv = idProveedores ' + 
                     'and StkRubroTM = idStkMonedas order by StkRubroCodGrp',
*/

router.get('/', function(req, res, next) {

    var coefmay = param.coeficientemay
    var coefmin = param.coeficientemin
    var minunion = param.cantminpu
    // var q = ['Select idStkRubro, StkRubroCodGrp, StkGrupo.StkGrupoDesc,',
    //         ' StkRubroDesc, StkRubroCosto, StkRubroTM, ',
    var q = ['Select idStkRubro, StkRubroCodGrp, StkRubroDesc, StkGrupo.StkGrupoDesc as GrupoDesc, ',            
            '(StkRubroCosto * StkMonedasCotizacion * ' + coefmin + ' ) as PPub, ',
            '(StkRubroCosto * StkMonedasCotizacion * ' + coefmay + ' ) as PMay, ',
            '((StkRubroCosto * StkMonedasCotizacion * ' + coefmay + ' ) + (REPValorMOT/60*'+minunion +')) as PMayPU, ', 
            '((StkRubroCosto * StkMonedasCotizacion * ' + coefmay + ') + (REPValorMOT/60*'+minunion +'*2)) as PMayPUR ',
            'from StkRubro JOIN StkGrupo, BasesGenerales.Proveedores, StkMonedas, ', 
            'reparacion.parametrosrep where StkRubroCodGrp = idStkGrupo', 
            'and StkRubroProv = idProveedores ', 
            'and StkRubroTM = idStkMonedas ', 
            'and StkRubroCodGrp = idStkGrupo ',
            'order by StkRubroCodGrp',].join(' ')
    conexion.query(q,
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });
});

module.exports = router;