"use strict"

/**
 *  ========================================
 *  MÉTODOS ÚTILES DE TABULATOR (Referencia)
 *  ========================================
 *  MÉTODOS DE DATOS:
 *      table.setData(data)          - Reemplaza todos los datos
 *      table.addData(data)          - Añade filas al final
 *      table.updateData(data)       - Actualiza filas existentes
 *      table.deleteRow(row)         - Elimina una fila
 *      table.getData()              - Obtiene todos los datos
 *      table.getDataCount()         - Cuenta total de filas
        
 * MÉTODOS DE FILTRADO:
 *     table.setFilter(filters)     - Aplica filtros
 *     table.clearFilter()          - Elimina filtros programáticos
 *     table.clearHeaderFilter()    - Limpia filtros de encabezado
 *     table.getFilters()           - Obtiene filtros activos
        
 * MÉTODOS DE ORDENAMIENTO:
 *     table.setSort(column, dir)   - Ordena por columna
 *     table.clearSort()            - Elimina ordenamiento
 *     table.getSorters()           - Obtiene orden actual
        
 * MÉTODOS DE PAGINACIÓN:
 *      table.setPage(page)          - Va a página específica
 *      table.previousPage()         - Página anterior
 *      table.nextPage()             - Página siguiente
 *      table.setPageSize(size)      - Cambia filas por página
 *      table.getPage()              - Página actual
 *      table.getPageMax()           - Número total de páginas
 * MÉTODOS DE EXPORTACIÓN:
 *      table.download(type, file, options) - Exporta datos
 *      Tipos: "csv", "json", "xlsx", "pdf", "html"
 * MÉTODOS DE SELECCIÓN:
 *      table.selectRow(row)         - Selecciona fila
 *      table.deselectRow()          - Deselecciona fila
 *      table.getSelectedData()      - Obtiene datos seleccionados
 * EVENTOS DISPONIBLES:
 *      table.on("cellClick", callback)      - Click en celda
 *      table.on("rowClick", callback)       - Click en fila
 *      table.on("dataLoaded", callback)     - Datos cargados
 *      table.on("dataFiltered", callback)   - Datos filtrados
 *      table.on("pageSizeChanged", callback) - Cambió tamaño página

 */

import { confTabulator } from './confTabulator.js'

const Tabulator = (() => {
    let table;
    const init = () => {
        document.addEventListener("DOMContentLoaded", () => {
            //listenner
            document.querySelector("#filtrar").addEventListener("input", filtrarFields);
            document.querySelector("#downloadXlsx").addEventListener("click", descargarXlsx);
            document.querySelector("#clearFilters").addEventListener("click", clearFiltros);
            table = confTabulator(); //configurar tabla;
            cargarDatos();

        });

    }

    const cargarDatos = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/users`);
            if (!response.ok) {
                throw new Error("Error en la comunicación: " + response.status);
            }
            const data = await response.json();

            // Cargar datos en la tabla con setData
            table.setData(data.data);
        } catch (error) {
            console.log(error);
        }


    }


    /**
     * @function filtrarFields
     * @description Búsqueda global en todas las columnas
     */

    const filtrarFields = (e) => {

        // MÉTODO: setFilter() - Aplica filtros a la tabla
        // Recibe un array de condiciones de filtro

        // El array anidado [[ ... ]] funciona como OR entre condiciones
        // Busca el valor en múltiples campos simultáneamente

        //Establecer valor true o false si se quiere filtra por el Estado al ser un campo boolean
        const val = e.target.value.toLowerCase();

        let activeFilter = null;
        if (val === "activo") activeFilter = true;
        else if (val === "inactivo") activeFilter = false;


        table.setFilter([
            [
                // Cada objeto es una condición de filtro
                { field: "name", type: "like", value: e.target.value },   // Busca en nombre
                { field: "email", type: "like", value: e.target.value },  // Busca en email
                { field: "role", type: "like", value: e.target.value },   // Busca en rol
                { field: "id", type: "like", value: e.target.value },     // Busca en ID
                { field: "active", type: "=", value: activeFilter },  //busca por activo
            ]
        ]);

        // Tipos de filtro disponibles:
        // "=" - igual exacto
        // "!=" - diferente
        // "like" - contiene (case insensitive)
        // ">" - mayor que
        // "<" - menor que
        // ">=" - mayor o igual
        // "<=" - menor o igual
        // "regex" - expresión regular

    }


    /**
     * @function descargarXlsx
     * @description Exportar a EXCEL
     */
    const descargarXlsx = () => {
        const fecha = new Date().toLocaleDateString('es-ES');
        console.log(fecha);

        // MÉTODO: download() - Exporta los datos de la tabla
        // Parámetros: (tipo, nombre_archivo, opciones)
        table.download(
            "xlsx",                              // Formato: "xlsx", "csv", "json", "pdf", "html"
            `tabla_datos_${fecha}.xlsx`,         // Nombre del archivo con fecha
            { sheetName: "Datos" }                 // Opciones: nombre de la hoja Excel
        );

        // La exportación incluye:
        // - Solo los datos filtrados actualmente visibles
        // - Respeta el ordenamiento actual
        // - Usa los formatters de las columnas
    };


    /**
    * @function descargarCsv
    * @description Exportar a CSV
    */
    const descargarCsv = () => {

        const fecha = new Date().toLocaleDateString('es-ES');

        // Exportar a CSV con delimitador personalizado
        table.download(
            "csv",                               // Formato CSV
            `tabla_datos_${fecha}.csv`,          // Nombre del archivo
            { delimiter: ";" }                   // Opciones: delimitador (por defecto es coma)
        );

        // Otros delimitadores comunes:
        // "," - coma (estándar internacional)
        // ";" - punto y coma (común en Europa/Latinoamérica)
        // "\t" - tabulador (TSV)
    };

    // ========================================
    // LIMPIAR TODOS LOS FILTROS
    // ========================================
    const clearFiltros = () => {
        // MÉTODO: clearFilter() - Elimina filtros programáticos (setFilter)
        table.clearFilter();

        // MÉTODO: clearHeaderFilter() - Limpia filtros de encabezado
        // (los que están en las columnas)
        table.clearHeaderFilter();

        // Limpiar también el campo de búsqueda del DOM
        document.querySelector("#filtrar").value = "";

        // Después de limpiar, la tabla muestra todos los datos originales
    };


    return { init }

})()

Tabulator.init();


