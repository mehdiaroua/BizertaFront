import { Component } from '@angular/core';
import { Maison } from '../models/maison';
import { VoyageService } from '../voyage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-voyage-detail',
  templateUrl: './voyage-detail.component.html',
  styleUrls: ['./voyage-detail.component.css']
})
export class VoyageDetailComponent {
  maison: Maison | undefined;
  id: number = 0; // Initialize the ID to 0

  constructor(private dataService: VoyageService, private route: ActivatedRoute , private router:Router) {}

  ngOnInit(): void {
    // Get the ID from the route parameter
    this.id = this.route.snapshot.params['id'];

    // Call the method to get Maison details by ID
    this.getMaisonById();
  }

  getMaisonById(): void {
    this.dataService.getMaisonById(this.id)
      .subscribe((maison: Maison) => {
        this.maison = maison;
      });
  }
  goBack(): void {
    this.router.navigate(['/voyage']);
  }

}
