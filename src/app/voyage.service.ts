import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './environments/environment';
import { Maison } from './models/maison';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoyageService {
  constructor(private httpClient: HttpClient) { }

  getAllMaisons(){
    return this.httpClient.get<Maison[]>(environment.api+"test/getAllMaisonWithImage")
   }
   getMaisonById(id: number): Observable<Maison> {
    return this.httpClient.get<Maison>(`http://localhost:8080/api/test/getMaisonById/${id}`);
  }
   searchHotelsByNomPays(pays: string, nom: string): Observable<Maison[]> {
    const params = new HttpParams()
      .set('pays', pays)
      .set('nom', nom);

      return this.httpClient.get<Maison[]>(`${environment.api}test/searchHotels`, { params });
    }
    addVoyageAndImage(nom: string, description: string, prix: number, pays: string, image: File): Observable<Maison> {
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('description', description);
      formData.append('prix', prix.toString());
      formData.append('pays', pays);
    
      formData.append('image', image, image.name);
    
      return this.httpClient.post<Maison>(`${environment.api}test/addMaisonWithImg`, formData);
    }
    
    updateMaisonAndImage(id: number,nom: string, description: string, prix: number, pays: string, image: File): Observable<Maison> {
      const formData = new FormData();
      formData.append('id', id.toString());
      formData.append('nom', nom);
      formData.append('description', description);
      formData.append('prix', prix.toString());
      formData.append('pays', pays);
    
      formData.append('image', image, image.name);
      const headers = new HttpHeaders();
    
      return this.httpClient.put<Maison>(`${environment.api}test/updateMaisonWithImg`, formData, { headers });
    }
    deleteMaison(Maison: Maison): Observable<any> {
      return this.httpClient.delete(`${environment.api}test/deleteMaison`, {body: Maison});
    }

}
