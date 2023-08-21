import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Plage } from '../models/plage';
import { PlageService } from '../plage.service';

@Component({
  selector: 'app-plage',
  templateUrl: './plage.component.html',
  styleUrls: ['./plage.component.css'],
  providers:[PlageService]

})
export class PlageComponent implements OnInit{
  plages:Plage[] =[];
   id: number = 1; // Set the ID you want to retrieve here
  
pays: string = '';
  nom: string = '';
constructor(private plageservice:PlageService,private R:Router){}
ngOnInit() {
this.getAllPlages();
this.getPlageById();

}

getAllPlages() {
  this.plageservice.getAllPlages()
    .subscribe(
      data => {
        this.plages = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
}
getPlageById(): void {
  this.plageservice.getPlageById(this.id)
    .subscribe((plages: Plage) => {
      // Assuming your getMaisonById API returns a single Maison, not an array
      this.plages.push(plages); // Add the retrieved Maison to the maisons array
    });
}
searchPlages(): void {
  this.plageservice.searchPlagesByNomPays(this.pays, this.nom)
    .subscribe(
      (data: Plage[]) => {
        this.plages = data;
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
}

}
