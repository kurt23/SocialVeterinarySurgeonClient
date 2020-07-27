import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';


@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  form: FormGroup;
  id: number;
  errorMessage: any;
  existingEmployee: Employee;

  constructor(private employeeService: EmployeeService,
              private formBuilder: FormBuilder,
              private avRoute: ActivatedRoute,
              private router: Router) {

    if (this.avRoute.snapshot.params['id']) {
      this.id = this.avRoute.snapshot.params['id'];
    }

    this.form = this.formBuilder.group(
      {
        id: 0,
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        fromMediaInteractiva: false
      }
    );
  }

  ngOnInit() {
  this.employeeService.getEmployee(this.id)
    .subscribe(data => {
      this.existingEmployee = data;
      this.form.controls.name.setValue(data.name);
      this.form.controls.lastName.setValue(data.lastName);
      this.form.controls.fromMediaInteractiva.setValue(data.fromMediaInteractiva);
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    let employee: Employee = {
      id: this.existingEmployee.id,
      name: this.form.get('name').value,
      lastName: this.form.get('lastName').value,
      fromMediaInteractiva: this.form.get('fromMediaInteractiva').value,
    };
    this.employeeService.upsertEmployee(employee)
      .subscribe((data) => {
        this.router.navigate([this.router.url]);
      });
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get formName() { return this.form.get('name'); }
  get formLastName() { return this.form.get('lastName'); }

}
