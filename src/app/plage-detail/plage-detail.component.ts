import { Component } from '@angular/core';
import { Plage } from '../models/plage';
import { PlageService } from '../plage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-plage-detail',
  templateUrl: './plage-detail.component.html',
  styleUrls: ['./plage-detail.component.css']
})
export class PlageDetailComponent {
  plage: Plage | undefined;
  id: number = 0; // Initialize the ID to 0

  constructor(private dataService: PlageService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Get the ID from the route parameter
    this.id = this.route.snapshot.params['id'];

    // Call the method to get Maison details by ID
    this.getPlageById();
  }

  getPlageById(): void {
    this.dataService.getPlageById(this.id)
      .subscribe((plage: Plage) => {
        this.plage = plage;
      });
  }
  goBack(): void {
    this.router.navigate(['/plage']);
  }
}
