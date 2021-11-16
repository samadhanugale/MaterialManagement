import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMaterialComponent } from './add-material/add-material.component';
import { LoginComponent } from './login/login.component';
import { MaterialMenuComponent } from './material-menu/material-menu.component';

const routes: Routes = [ 
  {path:'login', component: LoginComponent},
  {path:'showMaterial', component: MaterialMenuComponent},
  {path:'addMaterial', component: AddMaterialComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
