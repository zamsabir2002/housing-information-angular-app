import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent,
    FormsModule
  ],
  template: `
    <section>
      <form (submit)="filterResults(filter.value)">
        <input type="text" placeholder="Filter by City" #filter>
        <button class="primary" type="button"
        (click)="filterResults(filter.value)"
        >Search</button>
      </form>
      <section class="results">
        <!-- <app-housing-location [housingLocation]="housingLocation" ></app-housing-location> -->
        <app-housing-location
          *ngFor="let housingLocation of filteredLocationList"
          [housingLocation]="housingLocation">
        </app-housing-location>
      </section>
    </section>
  `,
  styleUrl: './home.component.css'
})

export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService)
  filteredLocationList: HousingLocation[] = [];

  constructor(){
    this.housingService.getAllHousingLocations().then(
      (housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      }
    )
  }

  filterResults(text: string){
    if(!text){
      this.filteredLocationList = this.housingLocationList
      return
    } 
    
    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );

  }
}
