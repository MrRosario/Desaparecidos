import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './api/auth.guard';

const routes: Routes = [
  { path: '',redirectTo: 'login', pathMatch: 'full' },
  { path: 'home',loadChildren: './home/home.module#HomePageModule'},
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' },
  { path: 'publicacao/:id', loadChildren: './publicacao/publicacao.module#PublicacaoPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'cadastro', loadChildren: './cadastro/cadastro.module#CadastroPageModule' },
  { path: 'publicar', loadChildren: './publicar/publicar.module#PublicarPageModule' },
  { path: 'pesquisar', loadChildren: './pesquisar/pesquisar.module#PesquisarPageModule' },
  { path: 'mapa', loadChildren: './mapa/mapa.module#MapaPageModule' },
  { path: 'editPerfil', loadChildren: './edit-perfil/edit-perfil.module#EditPerfilPageModule' },
  { path: 'edit-user', loadChildren: './edit-user/edit-user.module#EditUserPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
