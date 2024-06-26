import { Observable } from "rxjs"
import { IPC_EVENTS } from "../../ipc"
import { Sculpture } from "./sculpture"
import { NgZone } from "@angular/core";
//TODO: improve typing
declare var window: any; // Put this at the top of your component.
export type State<T> = {
  type: 'loading'
} | {
  type: 'error',
  message: string
} | {
  type: 'data',
  data: T
}

export function requestIPCData$<T>(event: IPC_EVENTS, dataInput: Object, ngZone: NgZone) {
  return new Observable<State<T>>(obs => {
    window.electron.ipcRenderer.send(event, dataInput);
    window.electron.ipcRenderer.once(event, (e: unknown, data: T) => {
      console.log("VENIT DIN IPC", event, data)
      ngZone.run(() => {
        obs.next({
          type: 'data',
          data
        });
      })
    });
  })
}

export const MAX_TOTAL_WEIGHT = 100;