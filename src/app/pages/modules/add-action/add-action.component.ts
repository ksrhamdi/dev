import { Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PlandActionService } from 'src/app/services/pland-action.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Paction } from 'src/app/Model/plandAction';
import { Users } from 'src/app/Model/users.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/users.service';
import { ActionService } from 'src/app/services/action.service';
import { MatDatepickerInputEvent } from '@angular/material';
import { NgbModal , ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActionModel } from 'src/app/Model/Action';
@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.css'],
  providers: [UserService ]
})
export class AddActionComponent implements OnInit {
  refPlan: string;
  refAction: string;
  nombre: number;
  minDate: Date;
  maxDate: Date;
  dateDeb: Date;
  dateFin: Date;
  closeResult: string;
  @ViewChild('pickerr') pickerr;
  @ViewChild('picker') picker;

  pland: Paction ;
  pilote: Users;
  userColl: any;
  selectedAccount = ' ';
  Delai: number;
  lists: ActionModel[] = [ ];
  actionss: any = [ ];
  equipe: any = [ ];
  help: any = [ ];
  grandRef: number;
  idPland: any;
  idTheme: any;
  designationThme: any;


  // tslint:disable-next-line: max-line-length
  constructor(private modalService: NgbModal, private actionService: ActionService , private usersService: UserService, private authService: AuthService, private plandAction: PlandActionService, private route: ActivatedRoute, private router: Router) { }
  affichage = false;
  test = true;
  action: ActionModel;
  mySwitch = true;
  visibilite = 'visible';
  Form: any;
  user: Users;

  fileToUpload: File = null;
  list = [{}];
 type: any;
// get plan and user connecter et liste des users
  async ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.idPland = params.idpland;
        this.idTheme = params.idtheme;
      });

    await this.getPlan();
    await this.getTheme();
    await this. getUser();
    this.getTypes();
    this.verifUser();
    this.formaterRef();


  }
  // vérifier si utilisateur connecté est le pilote de pland action
  verifUser() {
    this.authService.getCurrentId().subscribe((userConnecte: Users) => {
      this.user = userConnecte;
      this.getPlan();
      if (this.pland.planActionPilote !== this.user._id ) {
           this.pilote = this.user;
           this.selectedAccount = this.user._id;
           this.affichage = true;
      }
                 });
  }
  // change visibilité
  onChange() {
     this.mySwitch = !this.mySwitch;

  }
  async onSubmit(form: NgForm) {
    console.log(this.equipe[0].id_Pilote.indexOf(this.selectedAccount));
    if (this.equipe[0].id_Pilote.indexOf(this.selectedAccount) == -1) {
    this.actionService.ajoutPilote(this.idPland, this.selectedAccount).subscribe((data) => {
      console.log(data);
    });
    }
    // tslint:disable-next-line: max-line-length
    const model = new ActionModel('5e8c84c0b3a4f22544f6d4ad', this.refAction, this.selectedAccount, this.dateDeb, this.dateFin, form.value.description, form.value.problem, form.value.status, this.mySwitch);
    this.actionService.createAction(model, this.idTheme, this.idPland).subscribe((list: ActionModel) => {
     console.log("action ajouté");
     console.log("liste" + list);
 });
  }
  // comparaison des dates
  compareDate(Form: NgForm) {
    this.dateDeb = Form.value.dateDeb;
    this.dateFin = Form.value.dateFin;
    if (this.dateFin >= this.dateDeb) {
       return 1;
    } else {
      return -1;
    }
  }

// calcul du delai
  calcul(date: any) {

    const timediff = date.value.getTime() - this.dateDeb.getTime();
    const daysDiff = timediff / (1000 * 3600 * 24);
    this.Delai = daysDiff;
    // alert(days_Diff);



  }
  // get plandAction
  getPlan() {
    return new Promise((resolve) => {
    this.plandAction.getpland(this.idPland).subscribe((pland: any) => {
      this.pland = pland;
      this.equipe = pland.planActionEquipe;
      console.log(this.equipe);
      this.minDate = pland.planActionDateDebut;
      this.maxDate = pland.planActionDateFin;
      this.refPlan =  pland.refPlanAction;
      // tslint:disable-next-line: prefer-for-of
      resolve();
    });
  });
  }
  // get theme
  getTheme() {
  this.actionService.getThemeById(this.idTheme).subscribe((theme:any)=>{
  this.designationThme = theme.designationTheme;
  console.log(theme);
  console.log(this.designationThme);
  });
  }
  // formater ref action
  formaterRef() {
    this.actionService.getActionByPland(this.idPland).subscribe((lists: ActionModel[]) => {
      this.lists = lists;
      console.log( this.lists.length);
      this.nombre = lists.length;
      if (this.lists.length == 0) {
        this.refAction = 'ACT' + this.refPlan.substr(2, 6) + '00001';

      } else if (this.lists.length == 1 ) {
        this.refAction = 'ACT' + this.refPlan.substr(2, 6) + '00002';

      } else {
        for ( let i = 0 ; i < this.nombre - 1  ; i++) {
          const ref = Number(this.lists[i].refAction.substr(9, 5));
           // tslint:disable-next-line: prefer-const
          const refa = Number( this.lists[i + 1].refAction.substr(9, 5));
          if ( refa > ref) {
           this.grandRef = refa + 1;
           }
         }
        if (this.grandRef < 10) {
            this.refAction = 'ACT' + this.refPlan.substr(2, 6) + '0000' + this.grandRef;
           } else if (this.grandRef < 100) {
            this.refAction = 'ACT' + this.refPlan.substr(2, 6) + '000' + this.grandRef;
           } else if (this.grandRef < 1000) {
            this.refAction = 'ACT' + this.refPlan.substr(2, 6) + '00' + this.grandRef;
           } else if (this.grandRef < 10000) {
            this.refAction = 'ACT' + this.refPlan.substr(2, 6) + '0' + this.grandRef;
           } else if (this.grandRef < 100000) {
            this.refAction = 'ACT' + this.refPlan.substr(2, 6)  + this.grandRef;
           }
      }
     });
console.log('this.refAction' + this.refAction);
  }

  // get les membre equipes
  async getMembre() {
    return new Promise((resolve) => {
   this.getPlan().then(async () => {
   // tslint:disable-next-line: prefer-for-of
   for (let i = 0 ; i < this.equipe[0].id_Pilote.length ; i++) {
     this.usersService.getUserbyID(this.equipe[0].id_Pilote[i]) .subscribe
    (
     data => {
      // tslint:disable-next-line: prefer-const
      let role = { role: this.equipe[0].role  };
      // tslint:disable-next-line: prefer-const
      let z = Object.assign(data, role);
      this.help.push(z) ;
      resolve();
         }
   );
   }
   });
  });
  }
  // get liste des users
async getUser() {
  this.getMembre().then(async () => {
  this.usersService.getUsersList()
    .subscribe
    (
     data => {
       this.userColl = data ;
       console.log(this.userColl.length);
       console.log(this.help);
       this.list = this.help.concat(this.userColl);
       console.log( this.list);
      }
   );
  }
  );
  }
  // get liste des types
  getTypes() {
    this.actionService.getType().subscribe(data => {
      this.type = data;
       });
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}, ) .result.then((result) => {
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
