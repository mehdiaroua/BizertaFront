import { Component, OnInit } from '@angular/core';
import { Maison } from '../models/maison';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { VoyageService } from '../voyage.service';

@Component({
  selector: 'app-voyage',
  templateUrl: './voyage.component.html',
  styleUrls: ['./voyage.component.css'],
  providers:[VoyageService]

})
export class VoyageComponent implements OnInit{
  maisons: Maison[] = [];
  pays: string = '';
  nom: string = '';
  showCategories = false;
  id: number = 1; // Set the ID you want to retrieve here

  constructor(private dataService: VoyageService, private router: Router) {}

  toggleCategories() {
    this.showCategories = !this.showCategories;
    console.log('Toggle clicked. showCategories:', this.showCategories);
  }

  ngOnInit() {
    this.getAllMaisons();
    this.getMaisonById(); // Call the getMaisonById method here
  }

  getAllMaisons() {
    this.dataService.getAllMaisons()
      .subscribe(
        data => {
          this.maisons = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  getMaisonById(): void {
    this.dataService.getMaisonById(this.id)
      .subscribe((maison: Maison) => {
        // Assuming your getMaisonById API returns a single Maison, not an array
        this.maisons.push(maison); // Add the retrieved Maison to the maisons array
      });
  }

}
