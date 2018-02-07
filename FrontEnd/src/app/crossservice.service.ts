import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class CrossserviceService {
  pushedData = new EventEmitter<String>();
  pushData(value:String){
    this.pushedData.emit(value)
    
  }
  constructor() {}

}
