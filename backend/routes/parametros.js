var coeficientemin = 2.15;
var coeficientemay = 1.77;
var cantminpu = 1.3; //cantidad de minutos por metro que se cobra para unir paños

//parametros para ser usados en el cálculo de precio de lonas confeccionadas standar (de lista)
var abrojales28 = "O28HZ";
var abrojales3hz = "OJ3HZ";
var sogachicotemin = "SBN";
var sogachicotemay = "SB";
var sogadobladillo = "SNR";
var flete = 0.07; //valor del flete en dolares
var MOTpM2 = 1.46; //valor de la mano de obra en dolares por metro cuadrado en la confección de lonas
var codmoneda = "DLS"; //código de monedas para cálculo de flete y MOT

module.exports = {
  coeficientemay,
  coeficientemin,
  cantminpu,
  abrojales28,
  abrojales3hz,
  sogachicotemin,
  sogachicotemay,
  sogadobladillo,
  flete,
  MOTpM2,
  codmoneda
};
