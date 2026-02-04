"use strict"

import { confTabulator } from './confTabulator.js';
import {validarFormulario} from './confFormulario.js';
import{setModal, showModal, setTable} from './funciones.js';

const CRUD = (() => {
    let table;
    const init = () => {
        document.addEventListener("DOMContentLoaded", () => {
           const addUser=document.querySelector(".addUser");
           const btncleanFilters=document.querySelector("#clearFilters");
          // Crear modal y asignar a la instancia del modal
           const modal = new bootstrap.Modal(document.querySelector("#frmModal"));
           setModal(modal); // Almacena la instancia del modal para poder mostrarlo u ocultarlo más adelante en otros script

           validarFormulario()  
           //listenner
           addUser.addEventListener("click", btnAddUsuario);
           btncleanFilters.addEventListener("click", filtrarFields);
           table = confTabulator(); //configurar tabla;
           setTable(table); //guardar la tabla
         
        });

    }

    const btnAddUsuario = ()=>{
        document.querySelector("#modalTitle").textContent = "Nuevo Usuario";
        document.querySelector("#frmUsuario").reset(); //limpiar el formulario
        showModal(); //mostrar el modal
    }
    
 

    /**
     * @function filtrarFields
     * @description Búsqueda global en todas las columnas
     */

    const filtrarFields = (e) => {

        //Establecer valor true o false si se quiere filtra por el Estado al ser un campo boolean
        const valor = e.target.value.toLowerCase();

        let activeFilter = null;
        if (valor === "activo") activeFilter = true;
        else if (valor === "inactivo") activeFilter = false;


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

       
    }


   


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


    return { init}

})()

CRUD.init();

