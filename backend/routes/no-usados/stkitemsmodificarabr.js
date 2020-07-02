var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkitemsmodificar");
  } else {
    console.log("no se conecto en stkitemsmodificar");
  }
});

/*
idStkItems
*/

var router = express();

router.post("/", async function (req, res, next) {
  var d = new Date();
  finalDate = d.toISOString().split("T")[0];
  var idStkItems = req.query.idStkItems;
  var StkItemsGrupo = req.query.StkItemsGrupo;
  var StkItemsRubro = req.query.StkItemsRubro;
  var StkItemsRubroAbr = req.query.StkItemsRubroAbr;
  var StkItemsDesc = req.body.StkItemsDesc;
  var StkItemsCantidad = req.body.StkItemsCantidad;
  var StkItemsCantDisp = req.body.StkItemsCantDisp;
  var StkItemsFAct = finalDate;
  var StkItemsMin = req.body.StkItemsMin;
  var StkItemsMax = req.body.StkItemsMax;

  var q = [
    'UPDATE StkItems SET StkItemsDesc = "',
    StkItemsDesc,
    '", StkItemsCantidad = ',
    StkItemsCantidad,
    ", StkItemsCantDisp = ",
    StkItemsCantDisp,
    ', StkItemsFAct = "',
    StkItemsFAct,
    '", StkItemsMin = ',
    StkItemsMin,
    ", StkItemsMax = ",
    StkItemsMax,
    ", StkItemsRubro = ",
    StkItemsRubro,
    ", idStkItems = ",
    idStkItems,
    " WHERE idStkItems = ",
    idStkItems,
    " and StkItemsGrupo = ",
    StkItemsGrupo,
    " and  StkItemsRubroAbr = ",
    StkItemsRubroAbr
  ].join(" ");
  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
