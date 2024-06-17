import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SculptureService {

  private BASE_URL = 'http://localhost:3000/sculptures';

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get(this.BASE_URL);
  }
}
