import { UserService } from '../../../services/users.service';
import { PlandActionService } from '../../../services/pland-action.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { NgForm, FormControl, FormGroup } from '@angular/forms';
import {Users} from '../../../Model/users.model';
import {Paction} from '../../../Model/plandAction';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router, Params} from '@angular/router';



@Component({
  selector: 'app-addpaction',
  templateUrl: './addpaction.component.html',
  styleUrls: ['./addpaction.component.css'],
  providers: [UserService]
})
export class AddpactionComponent implements OnInit {

  // users: Users;
  dateDeb: Date;
  dateFin: Date;
  firstName: string;
  idPlan : any; 
  titre : string;
  public customerData : any;
  // color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  color = '#0AA299';
  model;
  user: Users[] = [];
  // states = [
  //   {name: 'Revue de direction'},
  //   {name: 'Audit interne '},
  //   {name: 'Revue des rebuts'},
  //   {name: 'Audit EN 9001'},
  //   {name: 'Préparation audit'},
  //   {name: 'Matrice de maturité'}
  // ];
  radioSelected: string;
  title = 'appBootstrap';
  descript: string;
  closeResult: string;
  paForm: any;
  searchText: string;
  membre: any = [];
  userColl: any;
  MembreColl: any = [];
  Membre: any = [];
  sourceColl: any;
  visibColl: any;
  selectedUser: number;
  pilotePa: Users;
  selection = [];
  nombre: number;
  grandRef: number;
  refPlan: string;
  refPAction: string;
  lists: Paction[] = [ ];
  fileToUpload: File = null;
  public formControl: FormControl = new FormControl(null);
  typeEquipe: string;
  ref = 'PA200001';
  roleEquipe: string[] = ['membre', 'observateur'];
  roleSelect: string;
  ann: string;
  allPlan: any = [];
  nbr: string;
  titrer: string;


  // tslint:disable-next-line: max-line-length
  constructor(private modalService: NgbModal, public usersService: UserService, private router: Router,private route: ActivatedRoute, public pactionService: PlandActionService, private authservice: AuthService) {}
  // error display
  error: any = {isError: false, errorMessage: '' };
  isValidedate: any;

  uploader: FileUploader = new FileUploader({ url: 'api/your_upload', removeAfterUpload: false, autoUpload: true });

  async ngOnInit() {

    this.formaterRef();
    this.getSources();
    this.getVisibiltes();
     


    this.authservice.getCurrentId().subscribe((x: Users) => {
  console.log('user ' + x.firstName);
  this.pilotePa = x;
  if (x) {
     console.log('') ;
    } else {
      this.router.navigate(['/login']);
    }
 });


    // this.refreshEmployeeList();
    this.usersService.getUsersList()
      .subscribe
      (
       data => {
         this.userColl = data ;
       }
     );
  }

  getSources() {
    this.pactionService.getSource().subscribe
    (
     data => {
       this.sourceColl = data ;
       console.log('sourceColl' + this.sourceColl);
     }
   );
}

getVisibiltes() {
  this.pactionService.getVisibilite().subscribe
  (
   data => {
     this.visibColl = data ;
     console.log('visibColl' + this.visibColl);
   }
 );
}


  compareDate(paForm: NgForm) {
  // this.router.navigate(['login']);
    console.log(paForm.value);
    this.dateDeb = paForm.value.dateDeb;
    this.dateFin = paForm.value.dateFin;
    console.log(this.dateDeb);
    console.log(this.dateFin);

    if (this.dateFin >= this.dateDeb) {
       console.log('true');
       return 1;
    } else {
      console.log('false');
      return -1;
      this.error = {isError: true, errorMessage: 'non erreur !  '};
      this.isValidedate = false;
    }
  }

   EnvoiPA(form: NgForm) {

    console.log('form values:' + form.value);
    console.log('form values:' + form.value.source);

    // tslint:disable-next-line: one-variable-per-declaration
    // var monObj = new Object(),
    // id_Pilote : string,
    // role : string;

    // monObj['id_Pilote'] = this.membre;
    // monObj['role']   = this.roleSelect;

    console.log ('ref fi wost l submit ' + this.refPAction)
    var equipe = new Object();
    equipe['id_Pilote'] = this.membre;
    equipe['role']   = this.roleSelect;
    console.log ('membre aaa    : '+ this.membre);
    console.log('equipe ; ' + equipe['id_Pilote'] )
    // tslint:disable-next-line: max-line-length
    const modelPaction = new Paction(this.pilotePa._id, '5e8c84c0b3a4f22544f6d4ad', form.value.titre, form.value.source, form.value.dateDeb, form.value.dateFin, equipe , form.value.fileupload,  '5ea2bcc642cbcfad9bf7825f',  this.refPAction , new Date(), form.value.visibil);
  
    this.pactionService.postPaction(modelPaction).subscribe((list: Paction) => {
      this.titre = list.planActionTitre;
      console.log("liste PA" + list)
      console.log("liste PA id" + list._id)
      this.idPlan = list._id; 
      this.titrer = list.planActionTitre; 
      localStorage.setItem('titre', this.titre );
      this.titrer = localStorage.getItem('titre');

      localStorage.setItem('idPA', list._id );


      console.log ('ajout reussi');
      console.log ('ajout titre' + this.titre);
      console.log ('idPlan' + this.idPlan);
     });
     console.log ('idPlan' + this.idPlan);

  }

//   resetForm(form:  NgForm)  {
//     form.resetForm();
// }

onFileChanged(event) {
  console.log( event.target.files[0].name);
  }

//   formaterRef() {
//     //count des pa
// // PA209999

// return new Promise((resolve) => {
// this.pactionService.getAll().subscribe  (
//   data => {
//     console.log("nombre : " + (Object.keys(data).length) ) ;
//    this.nombre = Object.keys(data).length + 1;
//    console.log("nombreee : " +  this.nombre ) ;
//    localStorage.setItem('nbrePA',this.nombre.toString());
  

//   });

// this.nbr =  localStorage.getItem('nbrePA');
// console.log('nombre nombre local s ' +  +this.nbr)
// const aa = new Date().getFullYear().toString().substr(-2);
// if (+this.nbr < 10 ) {
//      this.refPAction = 'PA' + aa + '000' +  +this.nbr;
//   } else if ((+this.nbr > 10 ) && (+this.nbr < 100 )) {
//     this.refPAction = 'PA' + aa + '00' + +this.nbr;
//  } else if ((+this.nbr > 100 ) && (+this.nbr < 1000 )) {
//   this.refPAction = 'PA' + aa + '0' + +this.nbr; } else {
//   this.refPAction = 'PA' + aa + +this.nbr; }

// console.log('ref PAction  lbara ' +   this.refPAction);
// });
// }

formaterRef() {
   const aa = new Date().getFullYear().toString().substr(-2);

   this.pactionService.getAll().subscribe((lists: Paction[]) => {
    this.lists = lists;
    console.log( this.lists.length);
    this.nombre = lists.length;
    if (this.nombre < 10 ) {
      this.refPAction = 'PA' + aa + '000' +  +this.nombre;
   } else if ((+this.nombre > 10 ) && (+this.nombre < 100 )) {
     this.refPAction = 'PA' + aa + '00' + +this.nombre;
   } else if ((+this.nombre > 100 ) && (+this.nombre < 1000 )) {
   this.refPAction = 'PA' + aa + '0' + +this.nombre; } else {
   this.refPAction = 'PA' + aa + +this.nombre; }
   });
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'},).result.then((result) => {
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

  radioChange(event) {

    console.log('aloo event ' + event.source.name, event.value);

    if (event.value === '5ea5926b404519a492b1c2d0') {
        this.descript = 'visible pour tous les membres de l’équipe du plan d’action.';
    } else if (event.value === '5ea59278404519a492b1c2d1') {
      this.descript = 'visible pour le pilote du plan d’actions et les responsables d’actions s’il y on a.';
   } else if (event.value === '5ea59287404519a492b1c2d2') {
      this.descript = 'visible pour tous les membres de l’organisation à laquelle appartient le pilote du plan d’actions (AERO/ FMS)';
   } else if (event.value === '5ea59291404519a492b1c2d3') {
    this.descript = 'visible pour tous les membres du site.';
   }
   
}

  onSelect(user: Users) {
   this.membre = user ;

   console.log ('selected membre is : ' + this.membre._id + '  ' + this.membre.firstName  + '  ' + this.membre.lastName );
}
inviter() {
  for (let i = 0; i< this.membre.length; i++) {
    // this.MembreColl.push(this.membre[i]);
    this.usersService.getUserbyID(this.membre[i]).subscribe(data => {
      this.MembreColl.push(data);
    });
  }}


getValues() {

  // console.log("membre " + this.membre)



  // console.log('membreColl' + this.MembreColl.length);
 


  // console.log('alo nous sommes les membres ' + this.membre);
  // console.log('types des membres : ' + this.roleSelect);
}
inviter2() {
  console.log('alo nous sommes les membres ' + this.membre);
  console.log('types des membres : ' + this.roleSelect);

}

envoi() {
  this.idPlan = localStorage.getItem('idPA');
  console.log(' this.idPlan' +  this.idPlan);

  this.router.navigate(['dashboard/enrechirpland/' + this.idPlan]);
}

retour() {
  // location.reload();
  location.reload();
}

retourr() {
  // location.reload();
  this.router.navigate(['/dashboard']);
}
}




