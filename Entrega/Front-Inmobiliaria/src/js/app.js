"use strict";

const InmobiliariaAPI = (() => {

    let selectorZona, elemento, subElemento1, bInmuebles, bGrabar, precioMin, precioMax, tabla;
    const init = () => {
        document.addEventListener("DOMContentLoaded", () => {
            Validator();
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
        // bInmuebles.addEventListener("click", buscarInmuebles);
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

    const Validator = () => {
        const validar = new JustValidate("#buscarForm", {
            errorFieldCssClass: 'is-invalid',
            errorLabelCssClass: 'invalid-feedback',
            focusInvalidField: true,
            validateBeforeSubmitting: true
        });

        validar
            .addField('#dni', [
                { rule: 'required', errorMessage: 'El DNI es obligatorio' },
                { rule: 'minLength', value: 9, errorMessage: 'El DNI debe tener 8 dígitos y 1 letra.' },
                { rule: 'maxLength', value: 9, errorMessage: 'El DNI debe tener 8 dígitos y 1 letra.' },
                { rule: 'customRegexp', value: /^[0-9]{8}[a-zA-Z]$/, errorMessage: 'El DNI debe tener 8 dígitos seguidos de 1 letra.' }
            ])
            .addField('#zonas', [
                { rule: 'required', errorMessage: 'Seleccionar la zona es obligatorio' }
            ])
            .addField('#precioMin', [ 
                { rule: 'required', errorMessage: 'El precio mínimo es obligatorio' },
                { rule: 'number', errorMessage: 'Debe ser un valor numérico' },
                { rule: 'minNumber', value: 0, errorMessage: 'El precio no puede ser negativo' },
                {
                    validator: (value, fields) => {
                        const precioMax = fields['#precioMax']?.elem?.value;
                        if (precioMax && parseFloat(value) > parseFloat(precioMax)) {
                            return false;
                        }
                        return true;
                    },
                    errorMessage: 'El precio mínimo no puede ser superior al precio máximo'
                }
            ])
            .addField('#precioMax', [ 
                { rule: 'required', errorMessage: 'El precio máximo es obligatorio' },
                { rule: 'number', errorMessage: 'Debe ser un valor numérico' },
                { rule: 'minNumber', value: 0, errorMessage: 'El precio no puede ser negativo' },
                {
                    validator: (value, fields) => {
                        const precioMin = fields['#precioMin']?.elem?.value; 
                        if (precioMin && parseFloat(value) < parseFloat(precioMin)) {
                            return false;
                        }
                        return true;
                    },
                    errorMessage: 'El precio máximo no puede ser inferior al precio mínimo'
                }
            ])
            .onSuccess((event) => {
                console.log('Formulario válido');
                buscarInmuebles(event);
            });
    }
    return { init };
})();

InmobiliariaAPI.init();