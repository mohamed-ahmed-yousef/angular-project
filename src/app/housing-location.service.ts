import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingLocationService {
  url = "http://localhost:3000/locations"
  constructor() { }
  async getAllHousingLocation(): Promise<HousingLocation[]> {
    return await (await fetch(this.url)).json() ?? []
  } 
  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    return await (await fetch(`${this.url}/${id}`)).json() || []
  }
  onFormsubmitService(data: {
    firstName: string
    lastName: string
    email: string}) {
    console.log(data)
  }


}
