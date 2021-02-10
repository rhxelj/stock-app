export const initial_state = {
  //Funcions agregaStock BEGIN ***//

  //FilaUno
  PresupMnMy: "mn",
  // PresupTipo: "UNIDAD",
  PresupCsSs: "cs",

  // Presup Ojal de Bronce
  PresupOB: 'hz',

  //FilaDos
  AnexoMedida: 0,
  PresupCantidad: 1.0,
  PresupTipo: "",
  DescripPresup: " ",
  ImporteAnexo: 0.0,
  renglonanexo: [],
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
  indexborrado: 1000,
  //FilaTres


  columns: [
    {
      title: "Cant.",
      field: "PresupCantidad",
      width: 10,

    },
    {
      title: "Descripción",
      field: "StkRubroDesc",
      width: 500,


    },
    {
      title: "Largo",
      field: "PresupLargo",
      width: 10,

    },
    {
      title: "Ancho",
      field: "PresupAncho",
      width: 10,

    },
    {
      title: "Imp. Unit.",
      field: "ImpUnitario",
      type: "currency",
      width: 120,
    },
    {
      title: "Imp. Item.",
      field: "ImpItem",
      type: "currency",
      width: 120,
    },
    // {
    //   title: "$ Item c/Anexos",
    //   field: "ImpItemCAnexos",
    //   // ToDo: mirar esto para dar estilo => cellStyle: { width: "4px", borderRadius: "50%", background: "red" },
    //   type: "currency",
    // },
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
  NroPresupuesto: 0
};
