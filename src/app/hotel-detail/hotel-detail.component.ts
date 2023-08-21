import { Component } from '@angular/core';
import { Hotel } from '../models/hotel';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent {
  hotel: Hotel | undefined;
  id: number = 0; // Initialize the ID to 0

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Get the ID from the route parameter
    this.id = this.route.snapshot.params['id'];

    // Call the method to get Maison details by ID
    this.getHotelById();
  }

  getHotelById(): void {
    this.dataService.getHotelById(this.id)
      .subscribe((hotel: Hotel) => {
        this.hotel = hotel;
      });
  }
  goBack(): void {
    this.router.navigate(['/hotels']);
  }

}
