var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupconftipomodificar");
  } else {
    console.log("no se conecto en presupconftipomodificar");
  }
});

var router = express();

router.post("/", async function (req, res, next) {
  indice = req.query.id;

  descr = req.body.StkGrupoDesc.toUpperCase();
  abrev = req.body.StkGrupoAbr;
  contRubro = req.body.StkGrupoContRubro;
  PresupConfTipoAnexo = req.body.PresupConfTipoAnexo.toUpperCase(),
    PresupConfTipoCant = req.body.PresupConfTipoCant,
    PresupConfTipoDesc = req.body.PresupConfTipoDesc.toUpperCase(),
    PresupConfTipoRubro = req.body.PresupConfTipoRubro.toUpperCase()
  //  'UPDATE StkGrupo SET StkGrupoDesc = "' + descr + '", StkGrupoAbr = "' + abrev + '", StkGrupoContRubro = '+ contRubro + ' WHERE idStkGrupo = "' + indice + '"',
  var q = [

    'UPDATE BasePresup.PresupConfTipo SET PresupConfTipoAnexo = "' +
    PresupConfTipoAnexo +
    '", PresupConfTipoCant = ' +
    PresupConfTipoCant +
    '", PresupConfTipoDesc = "' +
    PresupConfTipoDesc +
    '", PresupConfTipoRubro = ' +
    PresupConfTipoRubro +
    ' WHERE idPresupConfTipo = "' +
    indice +
    '"',
  ];
  // .join(" ");
  console.log(q);
  conexion.query(q[0], function (err, result) {
    if (err) {
      if (err.errno == 1062) {
        return res
          .status(409)
          .send({ message: "Abreviatura de Grupo existente" });
      } else console.log(err);
    } else {
      res.json(result);
    }
  });
});

conexion.end;
module.exports = router;
