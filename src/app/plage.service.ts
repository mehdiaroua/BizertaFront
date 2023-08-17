import { HttpClient, HttpParams } from '@angular/common/http';
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
   searchPlagesByNomPays(pays: string, nom: string): Observable<Plage[]> {
    const params = new HttpParams()
      .set('pays', pays)
      .set('nom', nom);

      return this.httpClient.get<Plage[]>(`${environment.api}test/searchPlages`, { params });
    }
}
