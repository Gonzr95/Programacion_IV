import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './components/home/home';

// Tambien se podria exportar solamente el array de rutas y 
// asi eliminar codigo innecesario

export const routes: Routes = [{
  path: 'home',
    component: Home,
  title: 'Admin - Home',
},
{
  path: 'config',
  loadComponent: () => import('./components/config/config').
    then(m => m.Config),
  title: 'Admin - Config',
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
