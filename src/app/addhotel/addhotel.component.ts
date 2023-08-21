import { Component, OnInit } from '@angular/core';
import { Hotel } from '../models/hotel';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-addhotel',
  templateUrl: './addhotel.component.html',
  styleUrls: ['./addhotel.component.css'],
  providers:[MessageService]

})
export class AddhotelComponent implements OnInit{
  produit: Hotel = new Hotel();
  submitted = false;
  imageFile!: File;
  uploadedFiles: any[] = [];

  constructor(private hotelb:DataService,private router:Router, private messageService:MessageService){}
  ngOnInit(): void {
    
  }


  save() {
    this.hotelb.addHotelAndImage(this.produit.nom, this.produit.description, this.produit.prix, this.produit.pays,  this.imageFile)
      .subscribe(data => this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Hotel Ajouté avec Succés' }), error => this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Hotel n est pas ajouté' }));

    this.produit = new Hotel();
    location.reload();
    this.router.navigate(['/addh']);



  }

  onSubmit() {
    this.submitted = true;
    this.save();
   // this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Produit Ajouté avec Succés' });
   // location.reload();
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
  }

  
}
