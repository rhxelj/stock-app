var express = require("express");
var router = express.Router();
var path = require("path");
var moment = require("moment");
var conexion = require("../../conexion");
// var gencodrubro = require("./stkitemscodabr");
// var nroitem = 0;

moment.locale("es");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkitemsagregar");
  } else {
    console.log("no se conecto en stkitemsagregar");
  }
});


router.post("/", async function (req, res) {

  var d = new Date();
  finalDate = d.toISOString().split("T")[0];

  var registro = {
    idStkItems: req.body.idStkItems,
    StkItemsGrupo: req.body.StkItemsGrupo,
    StkItemsRubro: req.body.StkItemsRubro,
    StkItemsRubroAbr: req.body.StkItemsRubroAbr,
    StkItemsDesc: req.body.StkItemsDesc.toUpperCase(),
    StkItemsCantidad: req.body.StkItemsCantidad,
    StkItemsCantDisp: req.body.StkItemsCantidad,
    StkItemsFAct: finalDate,
    StkItemsMin: req.body.StkItemsMin,
    StkItemsMax: req.body.StkItemsMax
  };
  console.log('está en stkitemsagregar registro ', registro)
  conexion.query("INSERT INTO StkItems SET ?", registro, function (
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
});

module.exports = router;
