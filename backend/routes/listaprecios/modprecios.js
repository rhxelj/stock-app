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

var compbody, compmysql

if (req.body.idProveedores != 0) {
    compbody = req.body.idProveedores
    compmysql = 'StkRubroProv'
}
if (req.body.idStkGrupo != 0) {
    compbody = req.body.idStkGrupo
    compmysql = 'StkRubroCodGrp'
}
if (req.body.StkRubroAbr != '') {
    compbody = req.body.StkRubroAbr
    compmysql = 'StkRubroAbr'
}

var importemod = req.body.importemod;
var porcentmod = req.body.porcentmod;

if (importemod != 0)
    {
    var q = ['UPDATE StkRubro SET',
            ' StkRubroCosto = StkRubroCosto + ' + importemod,
            ' WHERE ' + compmysql + ' = '  + compbody,
            ].join(' ')
    }
    else 
    {
    var q = ['UPDATE StkRubro SET',
            ' StkRubroCosto = StkRubroCosto + ',
            '(StkRubroCosto * ' + porcentmod / 100 +  ')',
            ' WHERE ' + compmysql + ' = '  + compbody,
            ].join(' ')
    }

conexion.query(q,
            function(err, result) {
                if (err) {
                    console.log('Error en UPDATE modprecios en ' +  compmysql);
                    console.log(err); 
                } 
                else 
                {
                    res.json(result);
                }
            })

})

module.exports = router;