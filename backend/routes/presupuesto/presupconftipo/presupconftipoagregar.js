var express = require("express");
var router = express.Router();
var path = require("path");
var moment = require("moment");
var conexion = require("../../conexion");

moment.locale("es");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupconftipoagregar");
  } else {
    console.log("no se conecto en presupconftipoagregar");
  }
});

router.post("/", function (req, res, next) {

  var registro = {
    PresupConfTipoLargo: req.body.PresupConfTipoLargo.toUpperCase(),
    PresupConfTipoAncho: req.body.PresupConfTipoAncho.toUpperCase(),
    PresupConfTipoAnexo: req.body.PresupConfTipoAnexo.toUpperCase(),
    PresupConfTipoCant: req.body.PresupConfTipoCant,
    PresupConfTipoDesc: req.body.PresupConfTipoDesc.toUpperCase(),
    PresupConfTipoRubro: req.body.PresupConfTipoRubro.toUpperCase()

  };
  conexion.query("INSERT INTO BasePresup.PresupConfTipo SET ?", registro, function (err, result) {
    if (err) {
      if (err.errno == 1062) {
        return res.status(409).send({ message: "error clave duplicada" });
      } else {
        console.log("ERROR ");
        console.log(err.errno);
      }
    } else {
      res.json(result);
    }
  });
});
conexion.end;
module.exports = router;
