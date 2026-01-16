"use strict"


export const DragDrop = (() => {

    const startDrag = (e) => {
        const element = e.target;
        e.dataTransfer.setData("text/plain", element.children[0].textContent);
        element.classList.add("dragging");
    }

    const endDrag = (e) => {
        e.target.classList.remove("dragging");
    }

    const overDrag = (e) => {
        e.preventDefault();
    }

    const enterDrag = (e) => {
        e.target.classList.add("drag-over");
    }

    const leaveDrag = (e) => {
        e.target.classList.remove("drag-over");
    }

    const drop = (e) => {
<<<<<<< HEAD
        const id = e.dataTransfer.getData("text/plain");
        e.target.classList.remove("drag-over");
        e.target.textContent = id;
=======
        console.log("Hola");
        const id = e.dataTransfer.getData("text/plain");
        const cuerpo = e.target.parentElement.parentElement.nextElementSibling;
        const celda = e.
        console.log(cuerpo);
>>>>>>> 45c54d1 (Pre volcado)
    }

    return { 
        startDrag,
        endDrag,
        overDrag,
        enterDrag,
        leaveDrag,
        drop
     };
})();
