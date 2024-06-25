import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Sculpture } from '../../model/sculpture';
import electron  from 'electron';
import { IPC_EVENTS } from '../../../ipc';
import { Observable } from 'rxjs';
import { State } from '../../model/common';

declare var window: any; // Put this at the top of your component.
@Injectable({
  providedIn: 'root'
})
export class SculptureService {

  private BASE_URL = 'http://localhost:3000/sculptures';

  constructor(private http: HttpClient, private ngZone: NgZone) { }

  getSculptures() {
    return this.http.get(this.BASE_URL);
  }

  getSculpture(id: string) {
    return new Observable<State<Sculpture>>(obs => {
      window.electron.ipcRenderer.send(IPC_EVENTS.GET_SCULPTURE, {id});
      window.electron.ipcRenderer.once(IPC_EVENTS.GET_SCULPTURE, (event: any, data: any) => {
        this.ngZone.run(() =>{
          obs.next({
            type: 'data',
            data
          });
        })
      });
    })
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
