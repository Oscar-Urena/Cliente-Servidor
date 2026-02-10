import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/body/body').then(m => m.Body)
    },
    {
        path: 'body',
        loadComponent: () => import('./components/body/body').then(m => m.Body)
    },
    {
        path: 'doblebinding',
        loadComponent: () => import('./components/doblebinding/doblebinding').then(m => m.Doblebinding)
    },
    {
        path: 'iforcom',
        loadComponent: () => import('./components/iforcom/iforcom').then(m => m.Iforcom)
    },
    {
        path: 'ng-class-c',
        loadComponent: () => import('./components/ng-class-c/ng-class-c').then(m => m.NgClassC)
    },
    {
        path: 'ng-style-c',
        loadComponent: () => import('./components/ng-style-c/ng-style-c').then(m => m.NStyleC)
    },
    {
        path: 'padre',
        loadComponent: () => import('./components/padre/padre').then(m => m.Padre)
    },
    {
        path: 'signal-c',
        loadComponent: () => import('./components/signal-c/signal-c').then(m => m.SignalC)
    },
    {
        path: 'switchcom',
        loadComponent: () => import('./components/switchcom/switchcom').then(m => m.Switchcom)
    },
    {
        path: 'EjemploComponente',
        loadComponent: () => import('./components/ejemplo-componente/ejemplo-componente').then(m => m.EjemploComponente)
    },
    {
        path: 'listaEstudiantes',
        loadComponent: () => import('./components/ejercicioEstudiantes/componentes/listaEstudiantes/listaEstudiantes').then(m => m.listaEstudiantes)
    },
    {
        path: 'servicios',
        loadComponent: () => import('./components/servicios/servicios').then(m => m.Servicios)
    },
    {
        path: 'login',
        loadComponent: () => import('./components/usuarios/login/login').then(m => m.Login)
    },
    {
        path: 'formulario',
        loadComponent: () => import('./components/usuarios/formulario/formulario').then(m => m.Formulario)
    },
    {
        path: 'CRUD',
        loadComponent: () => import('./components/usuarios/crud/crud').then(m => m.Crud)
    }
];
