import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { Hotel } from '../models/hotel';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { AddhotelComponent } from '../addhotel/addhotel.component';

@Component({
  selector: 'app-hotel-back',
  templateUrl: './hotel-back.component.html',
  styleUrls: ['./hotel-back.component.css'],
  providers:[MessageService,ConfirmationService,DialogService,MatDialog]

})
export class HotelBackComponent implements OnInit{
  clonedHotels: { [s: string]: Hotel } = {};
  hotel!: Hotel[];
  hotels!: Hotel;

  productDialog!: boolean;

    products!: Hotel[];

    product!: Hotel;

    selectedProducts!: Hotel[];

    selectedProduct!: Hotel;
    submitted!: boolean;

    statuses!: any[];
    imageFile!: File;
    ref!: DynamicDialogRef;
    id!:any;
    constructor(private hotelb:DataService,private messageService: MessageService,private dialog:MatDialog, private confirmationService: ConfirmationService,public dialogService: DialogService,private router:Router){}

  ngOnInit(): void {
    this.hotelb.getAllHotels().subscribe(
      (hotels: Hotel[]) => {
        this.hotel = hotels;
      },
      (error) => {
        console.log('Error fetching hotel data:', error);
        // Handle error appropriately, e.g., show a message to the user
      }

      //this.id = getUserId(); obtenir l'id de l'utilisateur
    );
      
  }
  show() {
    this.ref = this.dialogService.open(AddhotelComponent, { header: 'Add Hotel'});
}
deleteProduit(hotel: Hotel): void {
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete ' + hotel.nom + '?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.hotelb.deleteHotel(hotel).subscribe(
        () => {
          this.hotel = this.hotel.filter((val) => val.id !== hotel.id);
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content' });
          console.log('hotel deleted successfully');
          this.router.navigate(['/hotelb']);
        },
        (error) => {
          console.log('Error deleting hotel:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting repas', life: 3000 });
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
          this.hotelb.deleteHotel(this.product).subscribe();
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
      this.hotelb.addHotelAndImage(this.product.nom, this.product.description, this.product.prix,this.product.pays, this.imageFile)
  .subscribe(data => console.log(data), error => console.log(error));
this.product = new Hotel();
this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
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
onRowEditInit(produit: Hotel) {
  this.clonedHotels[produit.id] = { ...produit };
}
updateProduitAndImage(id: number, nom: string, description: string, prix: number, pays: string, image: File) {
  this.hotelb.updateHotelAndImage(id, nom, description, prix, pays, image).subscribe(
    (produit) => console.log(produit),
    (error) => console.log(error)
  );
}

onRowEditSave(produit: Hotel) {
  if (produit.prix > 0) {
    delete this.clonedHotels[produit.id];

    if (this.imageFile) {
      this.hotelb.updateHotelAndImage(produit.id,produit.nom, produit.description, produit.prix, produit.pays, this.imageFile).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'hotel is updated' });
          //this.imageFile = null; // reset image file after update
        },
        (error) => {
          console.log('Error updating hotel:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating repas', life: 3000 });
        }
      );
    } else {
      this.hotelb.updateHotelAndImage(produit.id,produit.nom, produit.description, produit.prix, produit.pays, this.imageFile).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Hotel is updated' });
        },
        (error) => {
          console.log('Error updating Hotel:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating Produit', life: 3000 });
        }
      );
    }
  } else {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
  }
}


onRowEditCancel(produit: Hotel, index: number) {
  this.hotel[index] = this.clonedHotels[produit.id];
  delete this.clonedHotels[produit.id];
}



}
