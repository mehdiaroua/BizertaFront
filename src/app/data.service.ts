import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Hotel } from './models/hotel';
import { environment } from './environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getAllHotels(){
    return this.httpClient.get<Hotel[]>(environment.api+"test/getAllHotelWithImage")
   }
   getHotelById(id: number): Observable<Hotel> {
    return this.httpClient.get<Hotel>(`http://localhost:8080/api/test/getHotelById/${id}`);
  }
   searchHotelsByNomPays(pays: string, nom: string): Observable<Hotel[]> {
    const params = new HttpParams()
      .set('pays', pays)
      .set('nom', nom);

      return this.httpClient.get<Hotel[]>(`${environment.api}test/searchHotels`, { params });
    }
    
 addHotelAndImage(nom: string, description: string, prix: number, pays: string, image: File): Observable<Hotel> {
  const formData = new FormData();
  formData.append('nom', nom);
  formData.append('description', description);
  formData.append('prix', prix.toString());
  formData.append('pays', pays);

  formData.append('image', image, image.name);

  return this.httpClient.post<Hotel>(`${environment.api}test/addHotelWithImg`, formData);
}

updateHotelAndImage(id: number,nom: string, description: string, prix: number, pays: string, image: File): Observable<Hotel> {
  const formData = new FormData();
  formData.append('id', id.toString());
  formData.append('nom', nom);
  formData.append('description', description);
  formData.append('prix', prix.toString());
  formData.append('pays', pays);

  formData.append('image', image, image.name);
  const headers = new HttpHeaders();

  return this.httpClient.put<Hotel>(`${environment.api}test/updateHotelWithImg`, formData, { headers });
}
deleteHotel(Hotel: Hotel): Observable<any> {
  return this.httpClient.delete(`${environment.api}test/deleteHotel`, {body: Hotel});
}

}
