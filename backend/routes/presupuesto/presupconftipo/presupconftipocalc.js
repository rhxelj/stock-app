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
  tipo = req.query.tipo;
  // tipo = req.params.tipo;

  /*
  select sum(BaseStock.StkRubro.StkRubroCosto * BaseStock.StkMonedas.StkMonedasCotizacion * BasePresup.PresupConfTipo.PresupConfTipoCant) from BasePresup.PresupConfTipo, BaseStock.StkRubro, BaseStock.StkMonedas where  PresupConfTipoRubro = BaseStock.StkRubro.StkRubroAbr and BaseStock.StkRubro.StkRubroTM = BaseStock.StkMonedas.idStkMonedas and PresupConfTipoDesc = "MORRAL";
  */
  // var q = ['select sum(PresupConfTipoCant) as Importe from BasePresup.PresupConfTipo where PresupConfTipoDesc = "' + tipo + '"'].join("");
  var q = ['select sum(BaseStock.StkRubro.StkRubroCosto * BaseStock.StkMonedas.StkMonedasCotizacion * BasePresup.PresupConfTipo.PresupConfTipoCant) as ImpItem from BasePresup.PresupConfTipo, BaseStock.StkRubro, BaseStock.StkMonedas where  PresupConfTipoRubro = BaseStock.StkRubro.StkRubroAbr and BaseStock.StkRubro.StkRubroTM = BaseStock.StkMonedas.idStkMonedas and PresupConfTipoDesc = "' + tipo + '"'].join("");

  console.log('q en la lectura ', q)


  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
      console.log('result en la lectura ', result)
    }
  });
});


conexion.end;
module.exports = router;
