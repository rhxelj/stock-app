update StkItems, StkRubro 
 set StkItems.StkItemsRubroAbr = StkRubro.StkRubroAbr 
where
(StkItems.StkItemsRubro = StkRubro.idStkRubro)
 and (StkItems.StkItemsGrupo = StkRubro.StkRubroCodGrp)
 ;

