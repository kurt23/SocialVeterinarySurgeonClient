
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { PetsComponent } from './components/pets/pets.component';
import { PetEditComponent } from './components/pet-edit/pet-edit.component';
import { EmployeeService } from './services/employee.service';
import { PetService } from './services/pet.service';
import { PetAddComponent } from './components/pet-add/pet-add.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    PetsComponent,
    EmployeeEditComponent,
    EmployeeAddComponent,
    EmployeesComponent,
    PetEditComponent,
    PetAddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    EmployeeService,
    PetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
