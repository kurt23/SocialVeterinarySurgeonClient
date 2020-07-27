import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees$: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employees$ = this.employeeService.getEmployees();
  }

  delete(employeeId) {
    const ans = confirm('Are you shure you want to delete this employee?');
    if (ans) {
      this.employeeService.deleteEmployee(employeeId).subscribe((data) => {
        this.loadEmployees();
      });
    }
  }
}
