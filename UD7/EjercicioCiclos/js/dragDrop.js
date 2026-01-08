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
        const id = e.dataTransfer.getData("text/plain");
        e.target.classList.remove("drag-over");
        e.target.textContent = id;
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
