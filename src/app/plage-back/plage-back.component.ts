import { Component, OnInit } from '@angular/core';
import { Plage } from '../models/plage';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PlageService } from '../plage.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddplageComponent } from '../addplage/addplage.component';

@Component({
  selector: 'app-plage-back',
  templateUrl: './plage-back.component.html',
  styleUrls: ['./plage-back.component.css'],
  providers:[MessageService,ConfirmationService,DialogService,MatDialog]

})
export class PlageBackComponent implements OnInit{
  clonedHotels: { [s: string]: Plage } = {};
  hotel!: Plage[];
  hotels!: Plage;

  productDialog!: boolean;

    products!: Plage[];

    product!: Plage;

    selectedProducts!: Plage[];

    selectedProduct!: Plage;
    submitted!: boolean;

    statuses!: any[];
    imageFile!: File;
    ref!: DynamicDialogRef;
    id!:any;
    constructor(private plageb:PlageService,private messageService: MessageService,private dialog:MatDialog, private confirmationService: ConfirmationService,public dialogService: DialogService,private router:Router){}

  ngOnInit(): void {
    this.plageb.getAllPlages().subscribe(
      (hotels: Plage[]) => {
        this.hotel = hotels;
      },
      (error) => {
        console.log('Error fetching plage data:', error);
        // Handle error appropriately, e.g., show a message to the user
      }

      //this.id = getUserId(); obtenir l'id de l'utilisateur
    );
      
  }
  show() {
    this.ref = this.dialogService.open(AddplageComponent, { header: 'Add Plage'});
}
deleteProduit(hotel: Plage): void {
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete ' + hotel.nom + '?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.plageb.deletePlage(hotel).subscribe(
        () => {
          this.hotel = this.hotel.filter((val) => val.id !== hotel.id);
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content' });
          console.log('plage deleted successfully');
          this.router.navigate(['/plageb']);
        },
        (error) => {
          console.log('Error deleting plage:', error);
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
          this.plageb.deletePlage(this.product).subscribe();
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
      this.plageb.addPlageAndImage(this.product.nom, this.product.description, this.product.prix,this.product.pays, this.imageFile)
  .subscribe(data => console.log(data), error => console.log(error));
this.product = new Plage();
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
onRowEditInit(produit: Plage) {
  this.clonedHotels[produit.id] = { ...produit };
}
updateProduitAndImage(id: number, nom: string, description: string, prix: number, pays: string, image: File) {
  this.plageb.updatePlageAndImage(id, nom, description, prix, pays, image).subscribe(
    (produit) => console.log(produit),
    (error) => console.log(error)
  );
}

onRowEditSave(produit: Plage) {
  if (produit.prix > 0) {
    delete this.clonedHotels[produit.id];

    if (this.imageFile) {
      this.plageb.updatePlageAndImage(produit.id,produit.nom, produit.description, produit.prix, produit.pays, this.imageFile).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'plage is updated' });
          //this.imageFile = null; // reset image file after update
        },
        (error) => {
          console.log('Error updating plage:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating plage', life: 3000 });
        }
      );
    } else {
      this.plageb.updatePlageAndImage(produit.id,produit.nom, produit.description, produit.prix, produit.pays, this.imageFile).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Plage is updated' });
        },
        (error) => {
          console.log('Error updating Hotel:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating Plage', life: 3000 });
        }
      );
    }
  } else {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
  }
}


onRowEditCancel(produit: Plage, index: number) {
  this.hotel[index] = this.clonedHotels[produit.id];
  delete this.clonedHotels[produit.id];
}



}
