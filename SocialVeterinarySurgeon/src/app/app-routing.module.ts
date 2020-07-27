import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { PetsComponent } from './components/pets/pets.component';
import { PetEditComponent } from './components/pet-edit/pet-edit.component';
import { PetAddComponent } from './components/pet-add/pet-add.component';

const routes: Routes = [
  { path: '', component: EmployeesComponent, pathMatch: 'full' },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employee/create', component: EmployeeAddComponent },
  { path: 'employee/edit/:id', component: EmployeeEditComponent },
  { path: 'employee/:id/pets', component: PetsComponent },
  { path: 'pet/edit/:id', component: PetEditComponent },
  { path: 'pet/create/:ownerId', component: PetAddComponent},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
