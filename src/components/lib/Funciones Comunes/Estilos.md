# Estilos para dejar fijo el encabezado de las tablas
Primero importo la hoja de estilo
```
import '../../../../Styles/TableHeader.css'
```

agrego la clase **headerFijo** a todos los encabezados ej
```javascript
 <TableHead>
    <TableRow>
        <CustomTableCell className="headerFijo" ></CustomTableCell>
        {
            columns.map((row, index) => {
            // return (<CustomTableCell style={{position: "sticky", top: 35}}key={index} onClick={() => {return row.order && this.sortBy(row.accessor)}} >{row.Header}</CustomTableCell>)
            return (<CustomTableCell className="headerFijo" key={index} onClick={() => {return row.order && this.sortBy(row.accessor)}} >{row.Header}</CustomTableCell>)
            })
        }
    </TableRow>
</TableHead>
```