import { Component } from '@angular/core';
import { Routes } from '@angular/router';



import { Home } from './components/home/home';
export const routes: Routes = [
    {
        // Carga directa - Eager Loading
        // Todo se carga al inicio, si el usuario
        // lo va ver lo usamos asi, si existe la 
        //posibilidad de que no ingrese --> Lazy Loading
        path: '',
        title: 'Home',
        component: Home,
    },
    {
        // Carga pajera - Lazy loading
        // Si no sabemos si el usuario va a acceder a esa ruta / componente
        // no lo cargamos innecesariamente
        path: 'about',
        title: 'About',
        loadComponent: () => import('./components/about/about').
            then(m => m.About)
    },
    {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin-routing-module').
            then(m => m.AdminRoutingModule)
    }
];
