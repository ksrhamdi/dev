import { Component, OnInit } from '@angular/core';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material';
import { ActionService } from 'src/app/services/action.service';
import { UserService } from 'src/app/services/users.service';
import { PlandActionService } from 'src/app/services/pland-action.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ActionModel } from 'src/app/Model/Action';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { AlertComponent } from 'src/app/alert/alert.component';

@Component({
  selector: 'app-edit-action',
  templateUrl: './edit-action.component.html',
  styleUrls: ['./edit-action.component.css'],
  providers: [UserService]
})
export class EditActionComponent implements OnInit {
  action: any;
  // tslint:disable-next-line: ban-types
  type:Object;
  seletedValue = '5ea2f52a0129a7a0652244db';
  mySwitch = true;
  datedeb: Date;
  datefin: Date;
  Delai: number;
  idPland: any;
  prob = '';
  desc= '';
  closeResult: string;
  idAction: any;
  types: Object;
  // tslint:disable-next-line: max-line-length
  constructor(private modalService: NgbModal, public actionService: ActionService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

 async ngOnInit() {
  await this.getAction();
  await this.getTypes();
  }
  getAction() {
    return new Promise((resolve) => {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params.id);
        if (params.id) {
          this.idAction = params.id;
          this.actionService.getActionById(params.id).subscribe((action: any) => {
            this.action = action[0];
            this.seletedValue = action[0].typeID;
            this.mySwitch = action[0].visibilite;
            this.datedeb = action[0].dateDebut;
            this.datefin = action[0].dateFin;
            this.prob = action[0].problemeConstat;
            this.desc = action[0].description;
            this.idPland = action[0].pland;
            console.log( this.action);
            this.calcul();
          });
        } else {
          this.action = undefined;
            }
      }
    );
    resolve();
  });
  }
  getTypes() {
    this.actionService.getType().subscribe(data => {
      this.types = data;
       });
  }
  onChange() {
    this.mySwitch = !this.mySwitch;
 }
 calcul() {
  console.log(this.action);
  const date1 = new Date(this.action.dateFin);
  const date2 = new Date(this.action.dateDebut);
  const timediff = date1.getTime() - date2.getTime();
  const daysDiff = timediff / (1000 * 3600 * 24);
  this.Delai = daysDiff;

}
async onSubmit(form: NgForm) {
  console.log(form.value);
  this.actionService.updateAction(this.idAction, form.value).subscribe(res => {
   console.log(res);
   alert(`l’action${this.action.refAction}a été mise à jour avec succès dans votre plan d’action’`);
   this.router.navigate(['dashboard/enrechirpland/', this.action.pland]);

  });
}
open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}, ).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}
refresh() {
  location.reload();
}
retour() {

  this.router.navigate(['/dashboard/enrechirpland/', this.idPland]);
  // tslint:disable-next-line: no-unused-expression
}
}
