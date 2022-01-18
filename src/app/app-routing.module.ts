import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// DETERMINANDO ROTAS DA APLICAÇÃO
const routes: Routes = [
  //Fazendo O LAZY LOAD
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  /* {
    path: 'perfil',
    loadChildren: () => import("./profile/profile.module").then((m) => m.ProfileModule),
  }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
