import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PerfilPage } from './perfil.page';
import { EditPerfilPage } from '../edit-perfil/edit-perfil.page';
import { EditUserPage } from '../edit-user/edit-user.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PerfilPage,
    EditPerfilPage, 
    EditUserPage
  ],
  entryComponents: [EditPerfilPage, EditUserPage]
})
export class PerfilPageModule {}
