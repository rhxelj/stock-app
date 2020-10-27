var express = require("express");
var router = express.Router();
var path = require("path");
var moment = require("moment");
var conexion = require("../../conexion");
// var gencodrubro = require("./stkitemscodabr");
// var nroitem = 0;
var dateFormat = require('dateformat');
moment.locale("es");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkitemsagregar");
  } else {
    console.log("no se conecto en stkitemsagregar");
  }
});


router.post("/", async function (req, res) {
  // var ItemDescripcion = ''
  var d = new Date();
  finalDate = d.toISOString().split("T")[0];
  console.log('finalDate   ', finalDate)
  console.log('finalDate   ', typeof (finalDate))
  console.log('d    ', dateFormat(d))
  // if (req.body.StkItemsDesc === undefined) {
  //   ItemDescripcion = ''
  // }
  // else {
  //   ItemDescripcion = req.body.StkItemsDesc.toUpperCase()
  // }
  var ItemDescripcion = req.body.StkItemsDesc === undefined ? '' : req.body.StkItemsDesc.toUpperCase()
  var registro = {
    idStkItems: req.body.idStkItems,
    StkItemsGrupo: req.body.StkItemsGrupo,
    StkItemsRubro: req.body.StkItemsRubro,
    StkItemsRubroAbr: req.body.StkItemsRubroAbr,
    // StkItemsDesc: req.body.StkItemsDesc.toUpperCase(),
    StkItemsDesc: ItemDescripcion,
    // StkItemsCantidad: req.body.StkItemsCantidad,
    // StkItemsCantDisp: req.body.StkItemsCantidad,
    StkItemsCantidad: 0,
    StkItemsCantDisp: 0,
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
