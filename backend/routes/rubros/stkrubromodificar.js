var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');


conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en stkrubromodificar");
    } else {
        console.log("no se conecto en stkrubromodificar");
    }
});


var router = express();



router.post('/', async function(req, res, next) {


var idStkRubro = req.query.id;
var StkRubroCodGrp = req.query.id2;
var StkRubroDesc = req.body.StkRubroDesc.toUpperCase();
var StkRubroAbr = req.body.StkRubroAbr.toUpperCase();
var StkRubroProv = req.body.StkRubroProv;
var StkRubroAncho = req.body.StkRubroAncho;
var StkRubroPresDes = req.body.StkRubroPresDes.toUpperCase();
var StkRubroPres = req.body.StkRubroPres;
var StkRubroUM = req.body.StkRubroUM;
var StkRubroCosto = req.body.StkRubroCosto;
var StkRubroTM = req.body.StkRubroTM;

    conexion.query('UPDATE StkRubro SET StkRubroDesc = "' + StkRubroDesc +
                                     '", StkRubroAbr = "' + StkRubroAbr + 
                                     '", StkRubroProv = '+ StkRubroProv + 
                                     ', StkRubroAncho = '+ StkRubroAncho + 
                                     ', StkRubroPresDes = "' + StkRubroPresDes +
                                     '", StkRubroPres = ' + StkRubroPres +
                                     ', StkRubroUM = "' + StkRubroUM +
                                     '", StkRubroCosto = '+ StkRubroCosto +
                                     ', StkRubroTM = "'+ StkRubroTM + 
                                     '" WHERE idStkRubro = ' + idStkRubro + ' and  StkRubroCodGrp = ' + StkRubroCodGrp,
        function(err, result) {
            if (err) {
                if (err.errno == 1062) 
                     {
                         return res.status(460).send({message : "error clave duplicada"});
                        }
                  else 
                  if (err.errno == 1406 || err.errno == 1264) 
                     {
                         return res.status(410).send({message : "Texto demasiado largo"});
                        }
                    {
                        (err)
                        //console.log (err.errno);
                    }
                } else {
                res.json(result);
                };
            });
        });


module.exports = router;