var express = require("express");
var router = express.Router();
var path = require("path");
var moment = require("moment");
var conexion = require('../conexion');

var nrovta = 1;

moment.locale("es");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupgraba");
  } else {
    console.log("no se conecto en presupgraba");
  }
});

router.post("/", async function (req, res) {
  console.log('esta en grabar')
  var d = new Date();
  var q1;
  // finalDate = d.toISOString().split("T")[0];
  // //'Select max(idStkMovVta) as UltMovVta from StkMovVta where StkMovVtaFecha = "' + finalDate + '"' ,
  // var q = [
  //   'Select max(idStkMovVta) as UltMovVta from StkMovVta where StkMovVtaFecha = "' +
  //     finalDate +
  //     '"'
  // ].join(" ");
  // conexion.query(q, function(err, result) {
  //   if (err) {
  //     if (err.errno === 1054) {
  //       nrovta = 1;
  //     } else {
  //       console.log("error al buscar el último  " + err.errno);
  //       console.log(err);
  //     }
  //   } else {
  //     res.json(result);
  //     nrovta = result[0].UltMovVta + 1;
  //   }

  //   var registro = {
  //     idStkMovVta: nrovta,
  //     StkMovVtaFecha: finalDate,
  //     StkMovVtaGrupo: req.body.StkMovVtaGrupo,
  //     StkMovVtaRubro: req.body.StkMovVtaRubro,
  //     StkMovVtaItem: req.body.StkMovVtaItem,
  //     StkMovVtaCantidad: Number(req.body.StkMovVtaCantidad)
  //   };
  var registro = { PresupDatosDetalle: req.body.PresupDatosDetalle };

  var resultado = ``;
  for (var i in req.body.PresupDatosDetalle) {
    //objeto.hasOwnProperty se usa para filtrar las propiedades del objeto
    if (req.body.PresupDatosDetalle.hasOwnProperty(i)) {
      resultado += `${req.body.PresupDatosDetalle}.${i} = ${req.body.PresupDatosDetalle[i]}\n`;
    }
  }
  console.log('resultado  ', resultado)
  var q = ["INSERT INTO BasePresup.PresupDatos SET  ?", registro].join(" ");
  console.log('q  ', q)
  // conexion.query(q, function (
  //   err,
  //   result
  // ) {
  //   if (err) {
  //     console.log("ERROR en Insert en presupgraba");
  //     console.log(err.errno);
  //   } else {
  //     res.json(result.rows);
  //   }
  // });
});

conexion.end;
module.exports = router;
