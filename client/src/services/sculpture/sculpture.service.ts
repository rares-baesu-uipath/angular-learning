import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sculpture } from '../../model/sculpture';

@Injectable({
  providedIn: 'root'
})
export class SculptureService {

  private BASE_URL = 'http://localhost:3000/sculptures';

  constructor(private http: HttpClient) { }

  getSculptures() {
    return this.http.get(this.BASE_URL);
  }

  getSculpture(id: string) {
    return this.http.get(`${this.BASE_URL}/${id}`);
  }

  createSculpture(sculpture: Sculpture) {
    return this.http.post(`${this.BASE_URL}`, {
      ...sculpture
    })
  }

  updateSculpture(sculpture: Sculpture) {
    return this.http.put(`${this.BASE_URL}/${sculpture.id}`, {
      ...sculpture
    })
  }
}
