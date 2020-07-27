import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../models/pet';
import { AnimalType } from 'src/app/models/AnimalType';

@Component({
  selector: 'app-add-edit',
  templateUrl: './pet-edit.component.html',
  styleUrls: ['./pet-edit.component.css']
})
export class PetEditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  id: number;
  errorMessage: any;
  existingPet: Pet;
  selectedType: AnimalType;

  constructor(private petService: PetService,
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
        type: ['', [Validators.required]],
      }
    );
  }

  ngOnInit() {
  this.petService.getPet(this.id)
    .subscribe(data => {
      this.existingPet = data;
      this.form.controls.name.setValue(data.name);
      this.form.controls.type.setValue(data.type);
      this.form.controls.ownerId.setValue(data.ownerId);
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    let pet: Pet = {
      id: this.existingPet.id,
      name: this.form.get('name').value,
      type: this.selectedType,
      ownerId: this.existingPet.ownerId
    };
    this.petService.upsertPet(pet)
      .subscribe((data) => {
        this.router.navigate([this.router.url]);
      });
  }

  selectChangeHandler (event: any) {
    this.selectedType = event.target.value;
  }

  cancel() {
    this.router.navigate(['/employee/' + this.existingPet.ownerId + '/pets']);
  }

  get formName() { return this.form.get('name'); }
  get formType() { return this.form.get('type'); }
}
