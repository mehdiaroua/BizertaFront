import { Component, OnInit } from '@angular/core';
import { Plage } from '../models/plage';
import { PlageService } from '../plage.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-addplage',
  templateUrl: './addplage.component.html',
  styleUrls: ['./addplage.component.css'],
  providers:[MessageService]

})
export class AddplageComponent implements OnInit{
  produit: Plage = new Plage();
  submitted = false;
  imageFile!: File;
  uploadedFiles: any[] = [];

  constructor(private plageb:PlageService,private router:Router, private messageService:MessageService){}
  ngOnInit(): void {
    
  }


  save() {
    this.plageb.addPlageAndImage(this.produit.nom, this.produit.description, this.produit.prix, this.produit.pays,  this.imageFile)
      .subscribe(data => this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Hotel Ajouté avec Succés' }), error => this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Hotel n est pas ajouté' }));

    this.produit = new Plage();
    location.reload();
    this.router.navigate(['/addp']);



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
