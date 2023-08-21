import { Component, OnInit } from '@angular/core';
import { Hotel } from '../models/hotel';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css'],
  providers:[DataService]
})
export class HotelComponent implements OnInit {
hotels:Hotel[] = [];
pays: string = '';
  nom: string = '';
  showCategories = false;
  id: number = 1; // Set the ID you want to retrieve here


constructor(private dataService:DataService,private R:Router){}

toggleCategories() {
  this.showCategories = !this.showCategories;
  console.log('Toggle clicked. showCategories:', this.showCategories);
}

ngOnInit() {
this.getAllHotels();
this.getHotelById();

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
getHotelById(): void {
  this.dataService.getHotelById(this.id)
    .subscribe((hotels: Hotel) => {
      // Assuming your getMaisonById API returns a single Maison, not an array
      this.hotels.push(hotels); // Add the retrieved Maison to the maisons array
    });
}
}
