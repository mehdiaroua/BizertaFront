import { Component } from '@angular/core';
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
export class PlageComponent {
  plages!:Plage[];
pays: string = '';
  nom: string = '';
constructor(private plageservice:PlageService,private R:Router){}
ngOnInit() {
this.getAllPlages();

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
