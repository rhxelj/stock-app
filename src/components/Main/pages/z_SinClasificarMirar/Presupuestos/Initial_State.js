export const initial_state = {
  //Funcions agregaStock BEGIN ***//

  //FilaUno
  //  PresupMnMy: "mn",
  // PresupTipo: "UNIDAD",
  PresupCsSs: "cs",
  vinomaymin: true,
  //FilaDos
  AnexoMedida: 0,
  PresupCantidad: 1.0,
  PresupTipo: "",
  DescripPresup: "",
  ImporteAnexo: 0.0,
  renglonanexo: [],
  renglonpresup: [],
  DetalleAnexo: "",
  stkrubro: [],
  clientes: [],
  PresupLargo: 0.0,
  PresupAncho: 0.0,
  AnexoLargo: 0.0,
  StkRubroAbr: "",
  idClientes: 0,
  PresupConfTipoDesc: "",
  LabelMed: "",
  DatosPresupEleg: [],
  tipoanexo: [],
  renglonfinal: [],
  tipopresup: [],
  //FilaTres

  columns: [
    {
      title: "Cantidad",
      field: "PresupCantidad",
    },
    {
      title: "Descripción",
      field: "StkRubroDesc",
    },
    {
      title: "Largo",
      field: "PresupLargo",
    },
    {
      title: "Ancho",
      field: "PresupAncho",
    },
    {
      title: "Imp. Unit.",
      field: "ImpUnitario",
      type: "currency",
    },
    {
      title: "Imp. Item.",
      field: "ImpItem",
      type: "currency",
    },
    {
      title: "$ Item c/Anexos",
      field: "ImpItemCAnexos",
      // ToDo: mirar esto para dar estilo => cellStyle: { width: "4px", borderRadius: "50%", background: "red" },
      type: "currency",
    },
  ],


  idStkGrupo: "",
  idStkRubro: "",
  idStkItems: "",
  cantidad: 1.0,
  // StkRubroPres: null,

  disponibilidad: 0,
  //Funcions agregaStock END ***//

  stkgrupo: [],

  stkitems: [],

  //F2C2
  stkitemsele: [],

  //FilaTres
  StkItemsFAct: "",
  StkRubroPres: "",
  StkRubroPresDes: "",
  StkRubroUM: "",
  StkRubroAncho: 0,

  //FilaCuatro
  nomCliente: "",
};
