"use scrict";

import { GET, GETid, POST } from "./API.js";
import { mostrarMensajes } from "./funciones.js";




const Gestioncitas = (() => {

    let btnBuscar, tarjetaSan, nuevaCita, mensajeInfo, especialidad, medico, observaciones, elemento1, elemento2, citas, dia, dias_consulta, fecha, mensajeEstado, hora_ini, hora_end, tramo, tramosContainer, tramoSeleccionado, btnGuardarCita;
    const diaSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    const init = () => {
        document.addEventListener("DOMContentLoaded", () => {
            validarFormulario();
            establecerObjetos();
            establecerEventos();
        });
    };

    const establecerObjetos = () => {
        btnBuscar = document.querySelector(".btnBuscar");
        tarjetaSan = document.querySelector("#tarjetaSanitaria");
        nuevaCita = document.querySelector(".nuevaCita");
        mensajeInfo = document.querySelector(".info");
        especialidad = document.querySelector("#especialidad");
        medico = document.querySelector("#medico");
        fecha = document.querySelector("#fecha");
        mensajeEstado = document.querySelector("#mensajeEstado");
        tramosContainer = document.querySelector(".tramos");
        observaciones = document.querySelector(".form-control");
        btnGuardarCita = document.querySelector(".btn-success");
    }

    const establecerEventos = () => {
        btnBuscar.addEventListener("click", buscarPaciente);
        especialidad.addEventListener("change", cargarMedicos);
        medico.addEventListener("change", cargarCitas);
        fecha.addEventListener("change", validarfecha);

    }

    const buscarPaciente = async () => {
        const resultado = await GETid("pacientes", tarjetaSan.value);
        if (resultado.data.length > 0) {
            mensajeInfo.classList.remove("ocultar");
            mensajeInfo.classList.add("paciente-found");
            if (mensajeInfo.classList.contains("paciente-notFound")) {
                mensajeInfo.classList.remove("paciente-notFound");
            }

            mensajeInfo.textContent = resultado.data[0].apellidos_nombre;
            nuevaCita.classList.remove("ocultar");
            await cargarEspecialidad();
        } else {
            mensajeInfo.classList.remove("ocultar");
            mensajeInfo.classList.add("paciente-notFound");
            if (mensajeInfo.classList.contains("paciente-found")) {
                mensajeInfo.classList.remove("paciente-found");
            }
            if (!nuevaCita.classList.contains("ocultar")) {
                nuevaCita.classList.add("ocultar");
            }
            mensajeInfo.textContent = "El paciente no existe";
        }
    }

    const cargarEspecialidad = async () => {
        const especialidades = await GET("especialidades");
        especialidades.data.forEach(element => {
            elemento1 = document.createElement("option");
            elemento1.value = element.id_especialidad;
            elemento1.textContent = element.nombre_especialidad;
            especialidad.append(elemento1);
        });
    }

    const cargarMedicos = async () => {
        limpiarMedicos();
        const medicos = await GETid("medicos", especialidad.value);
        console.log(medicos.data);
        medicos.data.forEach(element => {
            elemento1 = document.createElement("option");
            elemento1.value = element.num_colegiado;
            elemento1.textContent = element.nombre_completo;
            medico.append(elemento1);
        })
    }

    const limpiarMedicos = async () => {
        [...medico.querySelectorAll("option")].forEach(element => {
            if (element.value != "") {
                element.remove();
            }
        });
    }



    const cargarCitas = async () => {
        const dias = [...document.querySelectorAll(".form-check")];
        dias.forEach(element => {
            element.classList.remove("diaConsulta");
        })
        const medicos = await GETid("medicos", especialidad.value);

        medicos.data.forEach(element => {
            if (element.num_colegiado == medico.value) {
                dias_consulta = element.dias_consulta;
                hora_ini = element.hora_inicio;
                hora_end = element.hora_fin;
                tramo = element.duracion_cita;
            }
        })
        dias_consulta = dias_consulta.split(",");
        console.log(dias);
        dias_consulta.forEach(element => {
            switch (element) {
                case "Lunes":
                    dias[0].classList.add("diaConsulta");
                    break;
                case "Martes":
                    dias[1].classList.add("diaConsulta");
                    break;
                case "Miercoles":
                    dias[2].classList.add("diaConsulta");
                    break;
                case "Jueves":
                    dias[3].classList.add("diaConsulta");
                    break;
                case "Viernes":
                    dias[4].classList.add("diaConsulta");
                    break;
                default:
                    break;
            }
        });
        fecha.removeAttribute("disabled");
    }

    const validarfecha = (e) => {
        dia = new Date(e.target.value);
        console.log(dia.getDay());
        if (!dias_consulta.includes(diaSemana[dia.getDay()])) {
            mensajeEstado.textContent = "Ese día el doctor no tiene consulta";
            mensajeEstado.classList.remove("ocultar");
        } else {
            mensajeEstado.classList.add("ocultar");
            crearTramos(e.target.value);
        }
    }

    const crearTramos = () => {
        limpiarTramos();
        const horaCita = new Date();
        const horaInicio = new Date();
        const datos = hora_ini.split(":");
        horaInicio.setHours(datos[0], datos[1], datos[2]);
        horaCita.setDate(horaInicio);
        const horaFin = new Date();
        const datos1 = hora_end.split(":");
        horaFin.setHours(datos1[0], datos1[1], datos1[2]);
        do {
            elemento1 = document.createElement("button");
            elemento1.textContent = horaCita.getDate();
            horaCita.setMinutes(horaCita.getMinutes() + tramo);
            elemento1.classList.add("tramos-btn");
            elemento1.addEventListener("click", seleccionarTramo);
            tramosContainer.append(elemento1);
        } while ((horaCita.getMinutes() + tramo) <= horaFin.getMinutes());

    };

    const limpiarTramos =()=>{
        document.querySelectorAll(".tramos-btn").forEach(element =>{
            element.remove();
        });

    }

    const seleccionarTramo = (e)=>{
        e.preventDefault();
        tramoSeleccionado = e.target.textContent;
    }


    const validarFormulario = () => {
        const validar = new JustValidate(".formPaciente", {
            errorFieldCssClass: 'is-invalid',
            errorLabelCssClass: 'invalid-feedback',
            focusInvalidField: true,
            validateBeforeSubmitting: true
        });

        validar
            .addField('#tarjetaSanitaria', [
                { rule: 'required', errorMessage: 'El nombre es obligatorio' },
                { rule: 'minLength', value: 12, errorMessage: 'Mínimo 3 caracteres' },
                { rule: 'maxLength', value: 20, errorMessage: 'Máximo 50 caracteres' },
                { rule: 'customRegexp', value: /^[A-Z]{3}[0-9]+$/, errorMessage: 'Solo letras y espacios' }
            ])
            .addField('#especialidad', [
                { rule: 'required', errorMessage: 'La especialidad es obligatoria' }
            ])
            // Email
            .addField('#medico', [
                { rule: 'required', errorMessage: 'El medico es obligatorio' }
            ])
            //rol
            .addField('#fecha', [
                { rule: 'required', errorMessage: 'Debe seleccionar una fecha' }
            ])
            .addField('#observaciones', [
                { rule: 'required', errorMessage: 'Debe rellenar este campo' }
            ])
            // Submit
            .onSuccess( async ()=>  {
                console.log("hola");
                const cita = {
                    tarjeta: tarjetaSan,
                    colegiado: medico.value,
                    fecha: dia,
                    hora: tramoSeleccionado,
                    obser: observaciones.value,
                }

                const resultado = await POST(cita);
                
                limpiarFormulario();
            })

        // Agregar listener change  a los checkboxes DESPUÉS de crear el validador
        document.querySelectorAll('[name="intereses"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                validar.revalidateField('#error-intereses');
            });
        });

    }

    const limpiarFormulario = () =>{
        tarjetaSan.value = "";
        [...especialidad.querySelectorAll("option")].forEach(element => {
            if (element.value != "") {
                element.remove();
            }
        });
        limpiarMedicos();
        const dias = [...document.querySelectorAll(".form-check")];
        dias.forEach(element => {
            element.classList.remove("diaConsulta");
        });
        limpiarTramos();
        observaciones.value = "";
        nuevaCita.classList.add("ocultar");
    }




    return { init };
})();

Gestioncitas.init();