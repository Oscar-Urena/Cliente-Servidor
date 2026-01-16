"use strict";


const InmobiliariaAPI = (() => {

    let selectorZona, elemento, subElemento1, bInmuebles, bGrabar, precioMin, precioMax, tabla;
    const init = () => {
        document.addEventListener("DOMContentLoaded", () => {
            establecerObjetos();
            cargarZonas();
            establecerEventos();
        })
    };

    const establecerObjetos = () => {
        selectorZona = document.querySelector("#zonas");
        bInmuebles = document.querySelector("#bInmuebles");
        bGrabar = document.querySelector("#btnReservar");
        precioMin = document.querySelector("#precioMin");
        precioMax = document.querySelector("#precioMax");
    }

    const establecerEventos = () => {
        bInmuebles.addEventListener("click", buscarInmuebles);
        bGrabar.addEventListener("click", grabarAlquileres);
    }

    const cargarZonas = async () => {
        try {
            const result = await fetch("http://localhost:3000/api/zonas");
            if (!result.ok) {
                throw new Error(`Error en la comunicacion: ${result.status}`);
            }
            const data = await result.json();
            console.log(data.data[0]);
            data.data[0].forEach(element => {
                elemento = document.createElement("option");
                elemento.value = element.idzona;
                elemento.textContent = element.descripcion;
                selectorZona.append(elemento);
            });
        } catch (error) {

        }
    }

    const buscarInmuebles = async (e) => {
        e.preventDefault();
        const zona = selectorZona.value.trim();
        const precioMinimo = precioMin.value.trim();
        const precioMaximo = precioMax.value.trim();

        try {
            let url = "http://localhost:3000/api/inmuebles";
            const hayFiltros = zona && precioMinimo && precioMaximo;
            if (hayFiltros) {
                url += `?zona=${zona}&precioMin=${precioMinimo}&precioMax=${precioMaximo}`;
            }
            const result = await fetch(url);
            if (!result.ok) {
                throw new Error(`Error en la comunicación: ${result.status}`);
            }
            const data = await result.json();
            crearTabulator(data.data);
            bGrabar.classList.remove("ocultar");
        } catch (error) {
            console.error("Error buscando inmuebles:", error);
        }
    };


    const crearTabulator = (data) => {
        tabla = new Tabulator("#tabla-inmuebles", {
            data: data,
            layout: "fitColumns",
            pagination: "local",
            paginationSize: 5,
            paginationSizeSelector: [5, 10, 20],
            selectable: true,
            columns: [
                {
                    formatter: "rowSelection",
                    titleFormatter: "rowSelection",
                    hozAlign: "center",
                    headerSort: false,
                    width: 50
                },
                { title: "ID", field: "idinmueble" },
                { title: "Domicilio", field: "domicilio" },
                { title: "Tipo Inmueble", field: "tipo_inmueble" },
                { title: "Precio", field: "precio" },
                { title: "Habitaciones", field: "habitaciones" },
                { title: "Baños", field: "banos" },
                { title: "Metros", field: "metros_cuadrados" }
            ],
        });

        tabla.on("rowSelectionChanged", (data, rows) => {
            console.log(data.length);
            if (data.length > 0) {
                bGrabar.removeAttribute("disabled");
            } else {
                bGrabar.setAttribute("disabled", true);
            }
        })
    }

    const grabarAlquileres = async () => {
        try {
            const datosSeleccionados = tabla.getSelectedData();

            for (const element of datosSeleccionados) {
                const respuesta = await fetch("http://localhost:3000/api/reservas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        dni: dni.value,
                        inmueble: element.idinmueble
                    })
                });
                if (!respuesta.ok) {
                    throw new Error(`Error en el servidor: ${respuesta.status}`);
                }
                const resultado = await respuesta.json();
                console.log("Éxito: ", resultado);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return { init };
})();

InmobiliariaAPI.init();