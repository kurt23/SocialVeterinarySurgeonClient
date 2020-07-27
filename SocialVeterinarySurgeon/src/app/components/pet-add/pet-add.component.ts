import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../models/pet';
import { AnimalType } from 'src/app/models/AnimalType';

@Component({
  selector: 'app-pet-add',
  templateUrl: './pet-add.component.html',
  styleUrls: ['./pet-add.component.css']
})
export class PetAddComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  ownerId: number;
  errorMessage: any;
  existingPet: Pet;
  selectedType: AnimalType;

  constructor(private petService: PetService,
              private formBuilder: FormBuilder,
              private avRoute: ActivatedRoute,
              private router: Router) {

    if (this.avRoute.snapshot.params['ownerId']) {
      this.ownerId = this.avRoute.snapshot.params['ownerId'];
    }
    this.form = this.formBuilder.group(
      {
        id: 0,
        name: ['', [Validators.required]]
      }
    );
  }

  ngOnInit() {
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    let pet: Pet = {
      name: this.form.get('name').value,
      type: this.selectedType,
      ownerId: this.ownerId
    };

    this.petService.upsertPet(pet)
      .subscribe((data) => {
        this.router.navigate(['/employee/' + this.ownerId + '/pets']);
      });
  }

  selectChangeHandler (event: any) {
    this.selectedType = event.target.value;
  }

  cancel() {
    this.router.navigate(['/employee/' + this.ownerId + '/pets']);
  }

  get formName() { return this.form.get('name'); }
  get formType() { return this.form.get('type'); }
}
