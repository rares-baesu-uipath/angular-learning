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

  constructor(private ngZone: NgZone) { }

  getSculptures$() {
    return requestIPCData$<Sculpture[]>(IPC_EVENTS.GET_SCULPTURES, {}, this.ngZone);
  }

  getSculpture$(id: string) {
    return requestIPCData$<Sculpture>(IPC_EVENTS.GET_SCULPTURE, {id}, this.ngZone);
  }
  

  createSculpture$(sculpture: Sculpture) {
    return requestIPCData$(IPC_EVENTS.CREATE_SCULPTURE, sculpture, this.ngZone);
  }

  updateSculpture$(sculpture: Sculpture) {
    return requestIPCData$(IPC_EVENTS.UPDATE_SCULPTURE, sculpture, this.ngZone);
  }
}
