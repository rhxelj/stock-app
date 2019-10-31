var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('./conexion');




conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en proveedoresleer");
    } else {
        console.log("no se conecto en proveedoresleer");
    }
});




var router = express();

router.get('/', function(req, res, next) {
    //as StkTipoProveedDesc
// en el mysql tuve que cambiar la clave foránea porque no me permitía cambiar el tipodeproveedor en la tabla proveedores
      conexion.query(
          //'SELECT idProveedores, ProveedoresDesc, StkTipoProveed.StkTipoProveedDesc, ProveedoresTipo, ProveedoresCUIT, ProveedoresCalle, ProveedoresNroCalle, ProveedoresPiso, ProveedoresDto, ProveedoresCodPos, ProveedoresLoc, ProveedoresPcia, ProveedoresTel, ProveedoresContacto, ProveedoresMail, ProveedoresWeb, ProveedoresCodMon FROM BasesGenerales.Proveedores JOIN StkTipoProveed where BasesGenerales.Proveedores.ProveedoresTipo = StkTipoProveed.idStkTipoProveed ',
          'SELECT idProveedores, ProveedoresDesc, SubRubros.SubRubroDetalle , ProveedoresTipo, ProveedoresCUIT, ProveedoresCalle, ProveedoresNroCalle, ProveedoresPiso, ProveedoresDto, ProveedoresCodPos, ProveedoresLoc, ProveedoresPcia, ProveedoresTel, ProveedoresContacto, ProveedoresMail, ProveedoresWeb, ProveedoresCodMon FROM BasesGenerales.Proveedores JOIN BasesGenerales.SubRubros where BasesGenerales.Proveedores.ProveedoresTipo = BasesGenerales.SubRubros.idSubRubro ',
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