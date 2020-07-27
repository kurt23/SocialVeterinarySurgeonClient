import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PetService } from '../../services/pet.service';
import { EmployeeService } from '../../services/employee.service';
import { Pet } from '../../models/pet';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  pets$: Observable<Pet[]>;
  employeeId: number;

  constructor(private petService: PetService,
    private employeeService: EmployeeService,
    private avRoute: ActivatedRoute) {
    if (this.avRoute.snapshot.params['id']) {
      this.employeeId = this.avRoute.snapshot.params['id'];
    }
  }

  ngOnInit() {
    this.loadPets();
  }

  loadPets() {
    this.pets$ = this.employeeService.getEmployeePets(this.employeeId);
  }

  delete(petId) {
    const ans = confirm('Are you shure you want to delete this pet?');
    if (ans) {
      this.petService.deletePet(petId).subscribe((data) => {
        this.loadPets();
      });
    }
  }
}
