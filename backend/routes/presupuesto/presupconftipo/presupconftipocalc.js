var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupconftipocalc");
  } else {
    console.log("no se conecto en presupconftipocalc");
  }
});


var router = express();

router.get("/", function (req, res, next) {
  console.log('presupconftipocalc')
  //PresupConfTipoDesc = req.body.PresupConfTipoDesc.toUpperCase()
  var q = ['select sum(PresupConfTipoCant) as Importe from BasePresup.PresupConfTipo where PresupConfTipoDesc = "' + 'MORRAL' + '"'].join(" ");
  console.log(q)
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
