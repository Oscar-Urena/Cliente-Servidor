/**
 * @description Configuración de columnas de tabulator
*/
const columns = [
// COLUMNA DE SELECCIÓN
    {
        formatter: "rowSelection", 
        titleFormatter: "rowSelection", 
        hozAlign: "center", 
        headerSort: false,
        width: 40,
        cellClick: function(e, cell) {
            cell.getRow().toggleSelect();
        }
    },

    // COLUMNA ID
    {
        title: "ID",                    // Título que se muestra en el encabezado
        field: "id",                    // Campo del objeto de datos (data.id)
        width: 80,                      // Ancho fijo en píxeles
        sorter: "number",               // Tipo de ordenación (number, string, boolean, date)
        headerFilter: "input",          // Añade campo de filtro en el encabezado
        headerFilterPlaceholder: "Buscar ID..."  // Texto placeholder del filtro
    },

    // COLUMNA NOMBRE
    {
        title: "Nombre",
        field: "name",
        sorter: "string",               // Ordenación alfabético
        headerFilter: "input",          // Campo de texto para filtrar
        headerFilterPlaceholder: "Buscar nombre...",
        // formatter: Función para personalizar cómo se muestra el contenido
        formatter: (cell) => {
            // cell.getValue() obtiene el valor del campo (name)
            // Retornamos HTML personalizado (texto en negrita)
            return `<strong> ${cell.getValue()}</strong>`;
        }
    },

    // COLUMNA EMAIL
    {
        title: "Email",
        field: "email",
        sorter: "string",
        headerFilter: "input",
        headerFilterPlaceholder: "Buscar email...",
        widthGrow: 2                    // Esta columna crece 2x más que las demás
    },

    // COLUMNA ROL
    {
        title: "Rol",
        field: "role",
        sorter: "string",
        headerFilter: "list",         // Filtro tipo dropdown/select
        // headerFilterParams: Opciones del select
        headerFilterParams: {
            values: {
                "": "Todos",            // Opción vacía muestra todos
                "Admin": "Admin",
                "Usuario": "Usuario",
                "Editor": "Editor",
                "Visor": "Visor"
            }
        },
        // Formatter personalizado que retorna un badge de color según el rol
        formatter: (cell) => {
            const role = cell.getValue();
            const roleClass = `role-${role.toLowerCase()}`;
            return `<span class="role-badge ${roleClass}">${role}</span>`;
        }
    },

    // COLUMNA ESTADO
    {
        title: "Estado",
        field: "active",                // Campo booleano (true/false)
        sorter: "boolean",              // Ordenación booleano
        headerFilter: "list",
        headerFilterParams: {
            values: {
                "": "Todos",
                "true": "Activo",       // Valores como string porque vienen del list
                "false": "Inactivo"
            }
        },
        //Filtro personalizado al ser un campo boolean
        headerFilterFunc: (headerValue, rowValue) => {
            // headerValue = "" | "true" | "false"
            if (headerValue === "") return true; // Todos

            // convertir rowValue a booleano
            const rowBool = rowValue === true || rowValue === 1 || rowValue === "1";

            // convertir headerValue a booleano
            const headerBool = headerValue === "true";

            return rowBool === headerBool;
        },

        // Formatter que muestra un elemento visual según el estado
        formatter: (cell) => {
            const isActive = cell.getValue();
            const statusClass = isActive ? "status-active" : "status-inactive";
            const statusText = isActive ? "✓ Activo" : "✗ Inactivo";
            return `<span class="status-badge ${statusClass}">${statusText}</span>`;
        }
    }
];

/**
 * @function tableTabulator
 * @description configurar la tabla
 * @returns 
 */
export const confTabulator = () => {

    const table = new Tabulator("#data-table", {



        // LAYOUT: Cómo se ajustan las columnas
        // "fitColumns" - Las columnas se expanden para llenar el ancho disponible
        // Otras opciones: "fitData", "fitDataFill", "fitDataStretch"
        layout: "fitColumns",

        // RESPONSIVE: Comportamiento en pantallas pequeñas
        // "collapse" - Oculta columnas y muestra botón para expandir detalles
        // Otras opciones: "hide" (oculta columnas menos importantes)
        responsiveLayout: "collapse",

        // CARGA REMOTA DESDE NODE
        //ajaxURL: "http://localhost:3000/api/users",


        // PAGINACIÓN: Activar paginación automática
        // pagination: 'remote',

        //   //indicar como leer el JSON. Devuelve solamente el array de usuarios
        // ajaxResponse: (url, params, response) => {
        //     return response.data;
        // },

        //CARGA LOCAL
        pagination: true,

        // PAGINATIONSIZE: Número de filas por página por defecto
        paginationSize: 10,

        // PAGINATIONSIZESELECTOR: Opciones de filas por página
        // El usuario puede elegir entre estos valores
        paginationSizeSelector: [5, 10, 25, 50, 100],

        // PAGINATIONCOUNTER: Mostrar contador de filas
        // "rows" muestra "Mostrando X de Y filas"
        paginationCounter: "rows",
       
        
         
        
      

         selectable: true, // Esta es la opción correcta
      
        // COLUMNS: Array de definición de columnas (configurado arriba)
        columns: columns,

        // INITIALSORT: Ordenación inicial al cargar la tabla
        // Se ordena por columna "id" en dirección ascendente
        initialSort: [
            { column: "id", dir: "asc" }  // dir puede ser "asc" o "desc"
        ],

        // PLACEHOLDER: Mensaje cuando no hay datos
        placeholder: "No hay datos disponibles.",

        // LOCALE: Idioma de la interfaz
        locale: "es-es",

        // LANGS: Traducciones personalizadas
        // Aquí personalizamos los textos de la paginación en español
        langs: {
            "es-es": {
                "pagination": {
                    "page_size": "Filas por página",
                    "first": "Primera",
                    "first_title": "Primera página",
                    "last": "Última",
                    "last_title": "Última página",
                    "prev": "Anterior",
                    "prev_title": "Página anterior",
                    "next": "Siguiente",
                    "next_title": "Página siguiente",
                    "counter": {
                        "showing": "Mostrando",
                        "of": "de",
                        "rows": "filas"
                    }
                }
            }
        }
    });

    //Cada que que se selecciona una fila se muestra el nº de filas seleccionadas
    table.on("rowSelectionChanged", (data, rows)=>{
        console.log( data.length);
       
    });
    return table
}
