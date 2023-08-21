import { Component } from '@angular/core';
import { Maison } from '../models/maison';
import { VoyageService } from '../voyage.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-addvoyage',
  templateUrl: './addvoyage.component.html',
  styleUrls: ['./addvoyage.component.css'],
  providers:[MessageService]
})
export class AddvoyageComponent {
  produit: Maison = new Maison();
  submitted = false;
  imageFile!: File;
  uploadedFiles: any[] = [];

  constructor(private maisonb:VoyageService,private router:Router, private messageService:MessageService){}
  ngOnInit(): void {
    
  }


  save() {
    this.maisonb.addVoyageAndImage(this.produit.nom, this.produit.description, this.produit.prix, this.produit.pays,  this.imageFile)
      .subscribe(data => this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Hotel Ajouté avec Succés' }), error => this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Hotel n est pas ajouté' }));

    this.produit = new Maison();
    location.reload();
    this.router.navigate(['/addm']);



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
