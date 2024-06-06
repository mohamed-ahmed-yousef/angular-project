import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingLocationService } from '../housing-location.service';
import type { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
    <img class="listing-photo" [src]="housingLocation?.photo"
      alt="Exterior photo of {{housingLocation?.name}}"/>
    <section class="listing-description">
      <h2 class="listing-heading">{{housingLocation?.name}}</h2>
      <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
    </section>
    <section class="listing-features">
      <h2 class="section-heading">About this housing location</h2>
      <ul>
        <li>Units available: {{housingLocation?.availableUnits}}</li>
        <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
        <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
      </ul>
    </section>
    <section class="listing-apply">
      <h2  style="margin-top: 10px"> Apply now to live here </h2>
        <form [formGroup]="formGroup" (submit)="onFormSubmit()" style="margin-top:20px">
          <label for="first-name">First name</label>
          <input type="text" id="first-name" formControlName="firstName"/>
          <label for="last-name">Last name</label>
          <input type="text" id="last-name" formControlName="lastName"/>
          <label for="email">Email</label>
          <input type="email" id="email" formControlName="email"/>
          <button type="submit" style="">Apply now</button>
        </form>
    </section>
  </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  router: ActivatedRoute = inject(ActivatedRoute);
  housingServices: HousingLocationService = inject(HousingLocationService)
  housingLocation: HousingLocation | undefined
  formControl: FormControl = new FormControl()
  formSubmitService = inject(HousingLocationService)

  formGroup: FormGroup = new FormGroup({
    firstName: this.formControl ?? '',
    lastName: this.formControl ?? '',
    email: this.formControl ?? ''
  })
  constructor() {
    const housingLocationId = Number(this.router.snapshot.params['id'])
    this.housingServices.getHousingLocationById(housingLocationId).then((housingLocation: HousingLocation| undefined) => {
      this.housingLocation =  housingLocation
      
    })
  }
  onFormSubmit() {
    this.formSubmitService.onFormsubmitService(this.formGroup.value)
  }
}
