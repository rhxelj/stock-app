var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function(err) {
  if (!err) {
    console.log("base de datos conectada en stkenvaseagregar");
  } else {
    console.log("no se conecto en stkenvaseagregar");
  }
});

/*
idStkItems
*/

var router = express();

router.post("/", async function(req, res, next) {
  var q, q1;
  var idStkEnvase = 0;
  var StkEnvaseItem = req.query.idStkItems;
  var StkEnvaseGrupo = req.query.idStkGrupo;
  var StkEnvaseRubro = req.query.idStkRubro;

  //'Select max(idStkEnvase) as UltEnvase from StkEnvase where StkEnvaseGrupo = ' + StkEnvaseGrupo + ' and StkEnvaseRubro = ' + StkEnvaseRubro + ' and StkEnvaseItem = ' + StkEnvaseItem,
  q = [
    "Select ",
    "max(idStkEnvase) as UltEnvase",
    "from StkEnvase where StkEnvaseGrupo = ",
    StkEnvaseGrupo,
    "and StkEnvaseRubro = ",
    StkEnvaseRubro,
    " and StkEnvaseItem = ",
    StkEnvaseItem
  ].join(" ");
  conexion.query(q, function(err, result) {
    if (err) {
      if (err.errno === 1054) {
        nroenvase = 1;
      } else {
        console.log("error al buscar el último envase  " + err.errno);
        console.log(err);
      }
    } else {
      res.json(result);
      nroenvase = result[0].UltEnvase + 1;
    }
    // tengo que hacer esto req.body.cantidad veces que es la cantidad de envases que ingresaron con req.body.StkRubroPres de contenido
    var cantenvases = req.body.cantidad;
    var d = new Date();
    finalDate = d.toISOString().split("T")[0];
    for (i = 0; i < cantenvases; i++) {
      var registro = {
        idStkEnvase: nroenvase,
        StkEnvaseGrupo: StkEnvaseGrupo,
        StkEnvaseRubro: StkEnvaseRubro,
        StkEnvaseItem: StkEnvaseItem,
        StkEnvaseCant: req.body.StkRubroPres,
        StkEnvaseFechaAct: finalDate,
        StkEnvasePartida: req.body.StkEnvasePartida,
        StkEnvaseUbG: req.body.StkEnvaseUbG,
        StkEnvaseUbF: req.body.StkEnvaseUbF,
        StkEnvaseObserv: req.body.StkEnvaseObserv,
        StkEnvaseImprimio: "N"
      };

        conexion.query("INSERT INTO StkEnvase SET ?", registro, function(
          err,
          result
        ) {
        if (err) {
          console.log("ERROR ");
          console.log(err.errno);
        } else {
          res.json(result.rows);
        }
      });
      nroenvase++;
    }
  });
});
conexion.end;
module.exports = router;
