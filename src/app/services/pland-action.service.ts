import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Paction } from '../Model/plandAction';
@Injectable({
  providedIn: 'root'
})
export class PlandActionService {

  constructor(private webReqService: WebRequestService) { }

  getpland(id: string) {
    return this.webReqService.get(`api/paction/get/${id}`);
  }

  getAll() {
    return this.webReqService.get(`paction`);
  }


  postPaction(pct: Paction) {
    return this.webReqService.post(`api/pactionn/createPaction`, pct);
  }

  postTheme(idPa: string, designationTheme: string) {
    return this.webReqService.post(`api/pactionThem/${idPa}`, {designationTheme});
    // return this.http.post(this.baseUrlT + '/' + idPa, designationTheme);
  }
    // get liste des theme par pland action
//   getTheme(idPa: string) {
//     return this.webReqService.get(`api/pactionTheme/get/${idPa}`);
//  }
  getTheme(idPa: string) {
    return this.webReqService.get(`themeByIdd/${idPa}`);
 }
  //   return this.webReqService.get(`api/pactionTheme/get/${idPa}`);
  // }
  getSource() {
    return this.webReqService.get(`api/getSource/get`);
  }
  getVisibilite() {
    return this.webReqService.get(`api/getvisibilite/get`);
  }

  updateTheme(idPa: string, design: any) {
  return this.webReqService.patch(`pactionThem/${idPa}`, design );
  }

  deleteTheme(id: string){
    return this.webReqService.delete(`deletethemeByIdd/${id}`);
  }
  deleteThemeMulti(array: string) {
    return this.webReqService.delete(`deletetheme?${array}`);
  }
}
