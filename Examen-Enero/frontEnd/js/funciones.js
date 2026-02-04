
/**
     * @funtion mostrarMensajes
     * @description Muestra mensajes de estado en la interfaz
     * @param {string} mensajeTexto contiene el mensaje a visualizar
     * @param {string} clase clase de Bootstrap para el mensaje
     * @returns 
     */
export const mostrarMensajes = (mensajeTexto, clase) => {
    const mensaje = document.querySelector("#mensajeEstado")
    return new Promise((resolve, reject) => {
        mensaje.textContent = mensajeTexto;
        mensaje.classList.add(clase);
        mensaje.classList.remove("ocultar");
        setTimeout(() => {
            mensaje.classList.add("ocultar");
            mensaje.classList.remove(clase);
            resolve(true);
        }, 2000);
    })
}

