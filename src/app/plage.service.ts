import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './environments/environment';
import { Plage } from './models/plage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlageService {

  constructor(private httpClient: HttpClient) { }
  getAllPlages(){
    return this.httpClient.get<Plage[]>(environment.api+"test/getAllPlageWithImage")
   }
   getPlageById(id: number): Observable<Plage> {
    return this.httpClient.get<Plage>(`http://localhost:8080/api/test/getPlageById/${id}`);
  }
   searchPlagesByNomPays(pays: string, nom: string): Observable<Plage[]> {
    const params = new HttpParams()
      .set('pays', pays)
      .set('nom', nom);

      return this.httpClient.get<Plage[]>(`${environment.api}test/searchPlages`, { params });
    }
  
    addPlageAndImage(nom: string, description: string, prix: number, pays: string, image: File): Observable<Plage> {
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('description', description);
      formData.append('prix', prix.toString());
      formData.append('pays', pays);
    
      formData.append('image', image, image.name);
    
      return this.httpClient.post<Plage>(`${environment.api}test/addPlageWithImg`, formData);
    }
    
    updatePlageAndImage(id: number,nom: string, description: string, prix: number, pays: string, image: File): Observable<Plage> {
      const formData = new FormData();
      formData.append('id', id.toString());
      formData.append('nom', nom);
      formData.append('description', description);
      formData.append('prix', prix.toString());
      formData.append('pays', pays);
    
      formData.append('image', image, image.name);
      const headers = new HttpHeaders();
    
      return this.httpClient.put<Plage>(`${environment.api}test/updatePlageWithImg`, formData, { headers });
    }
    deletePlage(Plage: Plage): Observable<any> {
      return this.httpClient.delete(`${environment.api}test/deletePlage`, {body: Plage});
    }
}
