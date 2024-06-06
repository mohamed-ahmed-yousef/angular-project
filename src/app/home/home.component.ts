import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from './../housing-location/housing-location.component';
import type { HousingLocation } from '../housing-location';
import { Inject } from '@angular/core';
import { HousingLocationService } from '../housing-location.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section class="search">
        <input type="text" placeholder='filter by city' name="city" #filterByCity/>
        <button type="button" (click)="filterByCityResult(filterByCity.value)">Search</button>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let housingLocation of filterByCityList" [housingLocation]="housingLocation"></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  HousingLocationList: HousingLocation[] = []
  housingServices: HousingLocationService = inject(HousingLocationService)
  filterByCityList: HousingLocation[] = []
  constructor() {
    this.housingServices.getAllHousingLocation().then((housingLocationList: HousingLocation[]) => {
      this.HousingLocationList = housingLocationList
      this.filterByCityList = this.HousingLocationList
    })
  }
  filterByCityResult(city: string) {
    if (!city) this.filterByCityList = this.HousingLocationList
    this.filterByCityList = this.HousingLocationList.filter((housingLocation: HousingLocation) => housingLocation.city.toLowerCase().includes(city.toLowerCase()))
  }


}
