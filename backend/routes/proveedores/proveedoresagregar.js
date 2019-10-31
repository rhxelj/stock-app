var express = require('express');
var router = express.Router();
var path = require('path');
var moment = require('moment');
var conexion = require('../conexion');




moment.locale('es');

//router = express();
conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en proveedoresagregar");
    } else {
        console.log("no se conecto en proveedoresagregar");
    }
});


router.post('/', function(req, res) {
 
  var registro = {
    ProveedoresDesc : req.body.provdesc,
    ProveedoresTipo : req.body.provtipo,
    ProveedoresCUIT : req.body.provcuit,
    ProveedoresCalle  : req.body.provcalle,
    ProveedoresNroCalle : req.body.provnrocalle,
    ProveedoresPiso : req.body.provpiso,
    ProveedoresDto : req.body.provdto,
    ProveedoresCodPos : req.body.provcodpostal,
    ProveedoresLoc : req.body.provlocalidad,
    ProveedoresPcia : req.body.provprovincia,
    ProveedoresTel : req.body.provtelefono,
    ProveedoresContacto : req.body.provcontacto,
    ProveedoresMail : req.body.provmail,
    ProveedoresWeb : req.body.provpagweb,
    ProveedoresCodMon : req.body.provcodmon
  }
  
    var saludo = '';



        conexion.query('INSERT INTO BasesGenerales.Proveedores SET ?', registro, 
        function(err, result) {
            if (err) {
                if (err.errno == 1062) 
                {
                    return res.status(409).send({message : "error clave duplicada"});
                   }
             else 
               {
                   console.log (err.errno);
               }
           } else {
                res.json(result.rows);
            
            }
        });
});




module.exports = router;