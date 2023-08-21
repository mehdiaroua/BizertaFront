import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Maison } from '../models/maison';
import { VoyageService } from '../voyage.service';
import { Router } from '@angular/router';
import { AddvoyageComponent } from '../addvoyage/addvoyage.component';

@Component({
  selector: 'app-voyage-back',
  templateUrl: './voyage-back.component.html',
  styleUrls: ['./voyage-back.component.css'],
  providers:[MessageService,ConfirmationService,DialogService,MatDialog]
})
export class VoyageBackComponent {
  clonedHotels: { [s: string]: Maison } = {};
  hotel!: Maison[];
  hotels!: Maison;

  productDialog!: boolean;

    products!: Maison[];

    product!: Maison;

    selectedProducts!: Maison[];

    selectedProduct!: Maison;
    submitted!: boolean;

    statuses!: any[];
    imageFile!: File;
    ref!: DynamicDialogRef;
    id!:any;
    constructor(private maisonb:VoyageService,private messageService: MessageService,private dialog:MatDialog, private confirmationService: ConfirmationService,public dialogService: DialogService,private router:Router){}

  ngOnInit(): void {
    this.maisonb.getAllMaisons().subscribe(
      (hotels: Maison[]) => {
        this.hotel = hotels;
      },
      (error) => {
        console.log('Error fetching voyage data:', error);
        // Handle error appropriately, e.g., show a message to the user
      }

      //this.id = getUserId(); obtenir l'id de l'utilisateur
    );
      
  }
  show() {
    this.ref = this.dialogService.open(AddvoyageComponent, { header: 'Add Voyage'});
}
deleteProduit(hotel: Maison): void {
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete ' + hotel.nom + '?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.maisonb.deleteMaison(hotel).subscribe(
        () => {
          this.hotel = this.hotel.filter((val) => val.id !== hotel.id);
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content' });
          console.log('voyage deleted successfully');
          this.router.navigate(['/maisonb']);
        },
        (error) => {
          console.log('Error deleting voyage:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting plage', life: 3000 });
        }
      );
    }
  });
}
openNew() {

  this.submitted = false;
  this.productDialog = true;
}
deleteSelectedProducts() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.products = this.products.filter((val) => !this.selectedProducts.includes(val));
          this.maisonb.deleteMaison(this.product).subscribe();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
  });
}

hideDialog() {
  this.productDialog = false;
  this.submitted = false;
}
saveProduct() {
  this.submitted = true;
        //  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      this.products = [...this.products];
      this.productDialog = false;
      this.maisonb.addVoyageAndImage(this.product.nom, this.product.description, this.product.prix,this.product.pays, this.imageFile)
  .subscribe(data => console.log(data), error => console.log(error));
this.product = new Maison();
this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Data Created', life: 3000 });
  }

onFileSelected(event: any) {
this.imageFile = event.target.files[0];
}
findIndexById(id: number): number {
  let index = -1;
  for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
          index = i;
          break;
      }
  }

  return index;
}
createId(): string {
  let id = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}
onRowEditInit(produit: Maison) {
  this.clonedHotels[produit.id] = { ...produit };
}
updateProduitAndImage(id: number, nom: string, description: string, prix: number, pays: string, image: File) {
  this.maisonb.updateMaisonAndImage(id, nom, description, prix, pays, image).subscribe(
    (produit) => console.log(produit),
    (error) => console.log(error)
  );
}

onRowEditSave(produit: Maison) {
  if (produit.prix > 0) {
    delete this.clonedHotels[produit.id];

    if (this.imageFile) {
      this.maisonb.updateMaisonAndImage(produit.id,produit.nom, produit.description, produit.prix, produit.pays, this.imageFile).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'voyage is updated' });
          //this.imageFile = null; // reset image file after update
        },
        (error) => {
          console.log('Error updating voyage:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating voyage', life: 3000 });
        }
      );
    } else {
      this.maisonb.updateMaisonAndImage(produit.id,produit.nom, produit.description, produit.prix, produit.pays, this.imageFile).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'voyage is updated' });
        },
        (error) => {
          console.log('Error updating Hotel:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating Voyage', life: 3000 });
        }
      );
    }
  } else {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
  }
}


onRowEditCancel(produit: Maison, index: number) {
  this.hotel[index] = this.clonedHotels[produit.id];
  delete this.clonedHotels[produit.id];
}


}
