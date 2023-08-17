import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
   searchHotelsByNomPays(pays: string, nom: string): Observable<Hotel[]> {
    const params = new HttpParams()
      .set('pays', pays)
      .set('nom', nom);

      return this.httpClient.get<Hotel[]>(`${environment.api}test/searchHotels`, { params });
    }

}
