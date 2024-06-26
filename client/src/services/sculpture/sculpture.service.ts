import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Sculpture } from '../../model/sculpture';
import electron  from 'electron';
import { IPC_EVENTS } from '../../../ipc';
import { Observable } from 'rxjs';
import { State, requestIPCData$ } from '../../model/common';


@Injectable({
  providedIn: 'root'
})
export class SculptureService {

  private BASE_URL = 'http://localhost:3000/sculptures';

  constructor(private http: HttpClient, private ngZone: NgZone) { }


  getSculptures$() {
    return requestIPCData$<Sculpture[]>(IPC_EVENTS.GET_SCULPTURES, {}, this.ngZone);
  }

  getSculpture$(id: string) {
    return requestIPCData$<Sculpture>(IPC_EVENTS.GET_SCULPTURE, {id}, this.ngZone);
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
