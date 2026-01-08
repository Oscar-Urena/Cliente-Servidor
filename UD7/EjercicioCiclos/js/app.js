"use strict"

import { DragDrop } from "./dragDrop.js";

const EjercicioCiclos = (() => {

    let elemento, subElemento1, subElemento2, formCursos, formModulos, btnEnviar, sc1, sc2, calificaciones, campoCalificaciones, btnSubir;
    const init = () => {
        document.addEventListener("DOMContentLoaded", () => {
            establecerObjetos();
            cargarCursos();
            validarFormularioAlumnos();
            establecerEventos();
        })
    };

    const establecerObjetos = () => {
        formCursos = document.querySelector("#cursos");
        formModulos = document.querySelector("#modulos");
        btnEnviar = document.querySelector("#cargar");

        sc1 = document.querySelector(".mb-5");
        sc2 = document.querySelector(".calificaciones");

        calificaciones = document.querySelector(".col-lg-3 .card tbody");
        campoCalificaciones = document.querySelector(".myTable tbody");

        btnSubir = document.querySelector("#grabar");
    }

    const establecerEventos = () => {
        formCursos.addEventListener("change", cargarModulos);
        [...calificaciones.children].forEach(element => {
            element.setAttribute("draggable", true);
            element.addEventListener("dragstart", (e) => {
                DragDrop.startDrag(e);
            });
            element.addEventListener("dragend", (e) => {
                DragDrop.endDrag(e);
            });
        });

        btnSubir.addEventListener("click", subirCalificaciones);

    }
    const cargarCursos = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/cursos");
            if (!response.ok) {
                throw new Error(`Error en la comunicación: ${response.status}`);
            }
            const data = await response.json();
            data.data.forEach(element => {
                elemento = document.createElement("option");
                elemento.value = element.idCurso;
                elemento.textContent = element.descripcion;
                formCursos.append(elemento);
            });

        } catch (error) {

        }
    }

    const cargarModulos = async () => {
        try {
            borrarModulos();
            const response = await fetch("http://localhost:3000/api/modulos");
            if (!response.ok) {
                throw new Error(`Error en la comunicación: ${response.status}`);
            }
            const data = await response.json();
            console.log("Hola");
            data.data.forEach(element => {
                if (formCursos.value == element.idCurso) {
                    elemento = document.createElement("option");
                    elemento.value = element.idModulo;
                    elemento.textContent = element.descripcion;
                    formModulos.append(elemento);
                }
            });
        } catch (error) {
            const validator = new JustValidate('#basic_form');
        }
    }

    const cargarAlumnos = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/alumnos/${formCursos.value}`);
            if (!response.ok) {
                throw new Error(`Error en la comunicación: ${response.status}`);
            }
            const data = await response.json();
            console.log(data.data);
            data.data.forEach(element => {
                elemento = document.createElement("tr");
                subElemento1 = document.createElement("td");
                elemento.append(subElemento1);
                subElemento1.textContent = element.apellidosNombre;
                subElemento1.classList.add("alumno");
                subElemento1.id = element.idAlumno;
                subElemento2 = document.createElement("td");
                subElemento2.classList.add("calificaciones-alumno");
                elemento.append(subElemento2);
                subElemento2.addEventListener("dragover", DragDrop.overDrag);
                subElemento2.addEventListener("dragleave", DragDrop.leaveDrag);
                subElemento2.addEventListener("dragenter", DragDrop.enterDrag);
                subElemento2.addEventListener("drop", DragDrop.drop);
                campoCalificaciones.append(elemento);
            });

        } catch (error) {

        }
    }

    const subirCalificaciones = async () => {
        console.log(formModulos.value);
        const notas = document.querySelectorAll(".calificaciones-alumno");
        const alumnos = document.querySelectorAll(".alumno");
        for (let i = 0; i < notas.length; i++) {
            try {
                const response = await fetch("http://localhost:3000/api/calificaciones", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        idCurso: formCursos.value,
                        idModulo: formModulos.value,
                        idAlumno: alumnos[i].id,
                        calificacion: notas[i].textContent
                    })
                });
                if (!response.ok) {
                    throw new Error(`Error en la comunicacion ${response.status}`);
                }
                const data = await response.text();
                console.log(data);
            } catch (error) {

                console.log(error);
            }
        }

    }

    const borrarModulos = () => {
        [...formModulos.querySelectorAll("option:not(:first-child)")].forEach(elemento => elemento.remove());
    }

    const validarFormularioAlumnos = () => {
        const validar = new JustValidate(".frmDatos", {
            errorFieldCssClass: 'is-invalid', //es la clase que se añade al campo que tiene error
            errorLabelCssClass: 'invalid-feedback', //Es la clase que se asigna al mensaje de error que aparece debajo del input
            focusInvalidField: true, //si un campo no pasa la validación, esta opción hace que el cursor se coloque en el primer campo inválido
            validateBeforeSubmitting: true //hace que la validación ocurra antes de enviar el formulario
        });

        validar
            .addField('#cursos', [
                { rule: 'required', errorMessage: 'El curso es requerido' },

            ])
            .addField('#modulos', [
                { rule: 'required', errorMessage: 'El modulo es requerido' },
            ])
            .onValidate(() => {
                const valido = validar.isValid;
                btnEnviar.disabled = !valido;
            })
            .onSuccess(e => {
                e.preventDefault();
                cargarAlumnos();
                sc1.classList.add("ocultar");
                sc2.classList.remove("ocultar");
            })
    }


    return { init };
})();

EjercicioCiclos.init();