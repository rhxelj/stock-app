# Estilos para dejar fijo el encabezado de las tablas

Primero importo la hoja de estilo en el componente base ejemplo: StkGrupo.js

```
import '../../../../Styles/TableHeader.css'
```

agrego la clase **headerFijo** a todos los encabezados dentro del componente base ejemplo: StkGrupo.js

```javascript
<TableHead>
  <TableRow>
    <CustomTableCell className="headerFijo"></CustomTableCell>
    {columns.map((row, index) => {
      return (
        <CustomTableCell
          className="headerFijo"
          key={index}
          onClick={() => {
            return row.order && this.sortBy(row.accessor);
          }}
        >
          {row.Header}
        </CustomTableCell>
      );
    })}
  </TableRow>
</TableHead>
```
