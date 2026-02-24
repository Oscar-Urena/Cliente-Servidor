import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import('./components/home/home').then(m => m.Home)
    },
    {
        path: "juegos",
        loadComponent: () => import('./components/crud/crud').then(m => m.Crud)
    },
    {
        path: "formulario",
        loadComponent: () => import('./components/formularios/formularios').then(m => m.Formularios)
    },
    {
        path: "formulario/:id",
        loadComponent: () => import('./components/formularios/formularios').then(m => m.Formularios)
    },
    {
        path: "calificaciones",
        loadComponent: () => import('./components/comunicacion/padre/padre').then(m => m.Padre)
    },

];
