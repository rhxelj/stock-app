var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupconftipoleeanexo");
  } else {
    console.log("no se conecto en presupconftipoleeanexo");
  }
});

var router = express();

router.get("/", function (req, res, next) {
  PresupConfTipoAnexoSN = req.query.anexo;
  var q = ["SET @numero=0 "].join(" ");
  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
  //, PresupConfTipoImprime 
  var q = [" SELECT @numero:=@numero+1 as NroConfTipo , PresupConfTipoDesc, PresupConfTipoImprime  from BasePresup.PresupConfTipo where PresupConfTipoAnexo = '" + PresupConfTipoAnexoSN + "'  group by PresupConfTipoDesc, PresupConfTipoImprime  order by PresupConfTipoDesc "].join(" ");

  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
conexion.end;
module.exports = router;
