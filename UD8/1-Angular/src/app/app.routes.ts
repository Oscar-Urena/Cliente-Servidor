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
    
];
