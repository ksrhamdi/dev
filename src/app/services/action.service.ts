import { Type } from './../Model/type';
import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { ActionModel } from '../Model/Action';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private webReqService: WebRequestService) { }
  // get liste des types
  getType() {
    return this.webReqService.get(`types`);
  }

  getTypeById(id: string) {
    return this.webReqService.get(`listTypeByID/${id}`);
  }
  // get Theme by ID
  getThemeById(id: string) {
    return this.webReqService.get(`Theme/${id}`);
  }

  // creation d'un action
  createAction(action: ActionModel, id: string, idpland: string) {
    return this.webReqService.post(`action/${id}/${idpland}`, { action });

  }
  ajoutPilote( id: string, idPilote: string) {
    return this.webReqService.post(`ajoutMembre/${id}`, {idPilote});

  }
  updateAction(id: string, info: any) {
    // We want to send a web request to update a list
    return this.webReqService.patch(`action/${id}`, { info });
  }
  // get liste des action par pland action
  getActionByPland(id: string) {
    return this.webReqService.get(`listAction/${id}`);
  }
  // get Actions
  getAction() {
    return this.webReqService.get(`listAction`);
  }
  // get Action par ID
  getActionById(id: string) {
    return this.webReqService.get(`actionbyID/${id}`);
  }

  //get Action with user name
  getActionWithUser(id: string) {
    return this.webReqService.get(`actionbyIDUser/${id}`);
  }


   // get Actions By theme
   getActionByTheme(id: string) {
    return this.webReqService.get(`listActionByTheme/${id}`);
  }

  getTypeActionbyID(id: string) {
    return this.webReqService.get(`listTypeByID/${id}`);
  }

  deleteAction(id: string) {
    return this.webReqService.delete(`action/${id}`);
  }
  deleteMultiAction(array: string) {
    return this.webReqService.delete(`action?${array}`);
  }

}
