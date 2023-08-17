import { Component } from '@angular/core';
import { Hotel } from '../models/hotel';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css'],
  providers:[DataService]
})
export class HotelComponent {
hotels!:Hotel[];
pays: string = '';
  nom: string = '';
  showCategories = false;

constructor(private dataService:DataService,private R:Router){}

toggleCategories() {
  this.showCategories = !this.showCategories;
  console.log('Toggle clicked. showCategories:', this.showCategories);
}

ngOnInit() {
this.getAllHotels();

}

getAllHotels() {
  this.dataService.getAllHotels()
    .subscribe(
      data => {
        this.hotels = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
}
searchHotels(): void {
  this.dataService.searchHotelsByNomPays(this.pays, this.nom)
    .subscribe(
      (data: Hotel[]) => {
        this.hotels = data;
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
}
}
