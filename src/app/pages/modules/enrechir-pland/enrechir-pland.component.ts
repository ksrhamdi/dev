import { Type } from './../../../Model/type';
import { ActionService } from 'src/app/services/action.service';
import { ActionModel } from './../../../Model/Action';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlandActionService } from 'src/app/services/pland-action.service';
import { Paction } from 'src/app/Model/plandAction';
import { UserService } from 'src/app/services/users.service';
import { Users } from 'src/app/Model/users.model';
import { NgForm } from '@angular/forms';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-enrechir-pland',
  templateUrl: './enrechir-pland.component.html',
  styleUrls: ['./enrechir-pland.component.css'],
  providers: [UserService]
})
export class EnrechirPlandComponent implements OnInit {
equipe: object;
idPa :any ; 
checkedIDs: any[];
  checkedID: any[];
  checkedThmIDs: any[];
  checkedThmID: any[];
  closeResult: string;
  menuAction = false;
  menuTheme = true;
  rangg: string;
  idd: string;
// tslint:disable-next-line: max-line-length
constructor(private modalService: NgbModal, public actionService: ActionService, private userService: UserService, private plandAction: PlandActionService, private route: ActivatedRoute, private router: Router) { }
pilote: Users;
piloteA: string;
help: any = [ ];
equipePlandAction: any = [ ];
nom = 'khouloud';
type = 'PA';
div1 = false;
pland: Paction;
premierequipe: any = [ ];
equipePlan: any = [ ];
longeurReste: number;
restequipe: any[];
lenght: number;
select = true;
affich=false;
ThemeColl: any;
ThmIndex: any = [];
array:string = '';


arrayThm = '';
ActionColl: any;
selectedListId: any[];
rang = 0;
users: any = [ ];
name: string;
lastName: string;
Delai: number;
typeName: any;
typee: any;
pi: string;
changeText = true;
dateDeb: Date;
dateFin: Date;
datecmp = false;
sourceColl: any;
themeColl: any;
ok = false;
div1Start() {
  this.div1 = true;
}

div1Exit() {
  this.div1 = false;
}
ngOnInit() {
  
  this.checkedIDs = [];
  this.checkedThmIDs = [];
  // this.getActions(id:string);
  

    this.route.params.subscribe(
      (params: Params) => {
        this.idPa = params.id;
      });

  this.getTheme();

}



getPlan(){
  return new Promise((resolve) => {
  
    this.plandAction.getpland(this.idPa).subscribe((pland: Paction) => {
      this.pland = pland;
      this.idPa =  this.pland._id
      this.getPilote(this.pland.planActionPilote);
      console.log( this.pland);
      this.equipe = pland.planActionEquipe;      
      this.getPremierEquipe();

      resolve();
    });

    });
  }

  toggle() {
    this.select = !this.select;
  }

  // initiales noms :
  FormatName(item: string): string {
   this.pi = item.split(' ').map((n) => n[0]).join('').toUpperCase();
   console.log('initiales' + this.pi);
   return this.pi;
  }

  Rang(): number {
    const r = this.rang + 10 ;
    return r;

  }

getActionWithDetails(id: string) {
  console.log ('thm id : ' + id)
  this.actionService.getActionWithUser(id)
  .subscribe (data => {
    console.log ('data : ' + data)
    this.ActionColl = data ;
    console.log ('actionColl : ' + this.ActionColl)

  });
  this.ok = true;
}


// calcul delai
delai(dateFin: any, dateDeb: any) {
    let date1: any = new Date(dateFin);
    let date2: any = new Date(dateDeb);
    let diffDays: any = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));

    return diffDays;
  }


  // calcul echance
   echeance(date: any) {

    let date1: any = new Date(date);
    let date2: any = new Date();
    let diffDays: any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  // compare date
  compareDate(date2: any) {
    // this.router.navigate(['login']);
    let dateAuj = new Date();
    let dateFin = new Date(date2);

    if (dateFin >= dateAuj) {
        this.datecmp = true;
      } else {
        this.datecmp = false;
      }
    }

  onSubmit(form: NgForm) {

    this.plandAction.postTheme(this.idPa, form.value.theme).subscribe((res) => {
      location.reload();

       });
      }

      modifierThm(form: NgForm) {

       
        console.log('form values designationTheme:' + form.value.designationTheme);
        console.log ('modifier ', this.checkedThmIDs[0] );
        
        console.log(form.value);
        this.plandAction.updateTheme(this.checkedThmIDs[0], form.value).subscribe(res => {
         console.log(res);
        //  alert(`le theme ${this.checkedThmIDs[0]}a été mise à jour avec succès ’`);
        //  this.router.navigate(['dashboard/enrechirpland/', this.action.pland]);
        // for (let i = 0 ; i < this.ThmIndex.length ; i++){
         this.ThmIndex.forEach(element => {
            console.log('element 22' +element.id)
            if (element.id === this.checkedThmIDs[0]) {
                element.indexx = form.value.rang ;

                if ((form.value.rang)  != null) {
                  localStorage.setItem('rang', element.indexx);
                  localStorage.setItem('id', element.id);
                }
              
           }
   
         });
          // console.log ('ThmIndex 22' +  this.ThmIndex[i])
        //   if (this.ThmIndex[i].equipe['id'] === this.checkedThmIDs[0]) {
        //     this.ThmIndex[i].equipe['indexx'] === form.value.rang ;
        //   }
         });
     
     }    



getTheme() {
  this.getPlan().then(async () => {

  console.log("idp " + this.idPa);
  this.rangg = localStorage.getItem('rang');
  this.idd = localStorage.getItem('id');
  this.plandAction.getTheme(this.idPa).subscribe
  (
   data => {
     this.themeColl = data ;
     for (let i = 0 ; i < Object.keys(data).length ; i++)
  {

   if ((this.rangg != null ) && (this.idd === data[i]._id)) {
    var equipe = new Object();
    equipe['id'] =  data[i]._id ; 
    equipe['designationTheme'] = data[i].designationTheme;
    equipe['indexx']   = this.rangg;
   } else {
    var equipe = new Object();
    equipe['id'] =  data[i]._id ; 
    equipe['designationTheme'] = data[i].designationTheme;
    equipe['indexx']   = (i+1)*10;
   }
  
   console.log ('equipe  : ' +   equipe['index']);
   
   this.ThmIndex.push(equipe) ;
    console.log ('ThmIndex : ' + this.ThmIndex);
  }
     console.log('length themeColl :' + this.themeColl.length);
   }

 );
  });
  console.log('themeColl ' + this.themeColl);
  

  

  // ThmIndex
}



getPilote(id: string) {
this.userService.getUserbyID(id).subscribe((user: Users) => {
this.pilote = user;
});
}

// get liste des equipe 
 getEquipe( ) {
  return new Promise((resolve) => {
    console.log("equipe " + this.equipe[0].id_Pilote.length);
    console.log(Object.keys(this.equipe).length);
    const a = Object.keys(this.equipe).length;
    if (a === 2)
    {
      this.lenght = (this.equipe[0].id_Pilote.length + this.equipe[1].id_Pilote.length) - 4;
    } else {
      this.lenght = (this.equipe[0].id_Pilote.length ) - 4;
    }
  
    // tslint:disable-next-line: prefer-for-of
    if (a === 2)
    {
      for (let i = 0 ; i < this.equipe[1].id_Pilote.length ; i++) {
        this.userService.getUserbyID(this.equipe[1].id_Pilote[i]) .subscribe
       (
        data => {
        
          
         let x = { role: this.equipe[1].role  };
         let z = Object.assign(data, x);
         this.help.push(z) ;
         resolve();
            }
      );
      
      }
   
    for (let i = 0 ; i < this.equipe[0].id_Pilote.length ; i++) {
      
    this.userService.getUserbyID(this.equipe[0].id_Pilote[i]) .subscribe
 (
  data => {
   
   let x = { role: this.equipe[0].role  };
   let z = Object.assign(data, x);
   this.help.push(z) ;
   
      }
);
}
} else if (a === 1)
{
  for (let i = 0 ; i < this.equipe[0].id_Pilote.length ; i++) {
      
    this.userService.getUserbyID(this.equipe[0].id_Pilote[i]) .subscribe
 (
  data => {
   
   let x = { role: this.equipe[0].role  };
   let z = Object.assign(data, x);
   this.help.push(z) ;
   
      }
);
}
}
// // tslint:disable-next-line: prefer-for-of

   // tslint:disable-next-line: no-unused-expression



 });
// get liste des equipe
 }
  async getPremierEquipe() {
  await this.getEquipe().then(async () => {
  
    console.log( this.help);
    await (this.equipePlandAction = this.help);
    console.log(this.equipePlandAction);
    this.premierequipe = this.equipePlandAction.slice(0, 4);
    // for (let i = 0 ; i < 4; i++) {
    //     this.premierequipe.push(this.help[i]);
    //    }
    console.log(this.premierequipe);
    

    });
      }
      radiodChangeHandler(event: any) {
        this.checkedID = [];
 
        if (event.target.checked) {
          console.log('event click action: ' + event.target.value);
          this.checkedIDs.push(event.target.value);
          this.checkedID.push(event.target.value);
          console.log(this.checkedIDs);
        }
        if ( this.checkedID.length == 1) {
          this.menuAction = true;
          this.menuTheme = false;
        } if ( this.checkedID.length != 1) {
          this.menuAction = false;
          this.menuTheme = true;
         }
 
        }

      radiodChangeThmHandler(event: any) {
        this.checkedThmID = [];

        if (event.target.checked) {
          console.log('event click theme: ' + event.target.value);
          this.checkedThmIDs.push(event.target.value);
          this.checkedThmID.push(event.target.value);
          console.log(this.checkedThmIDs);
        }
      }


      supprimer() {
        if ( this.checkedIDs.length == 1 ) {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0 ; i < this.ActionColl.length ; i++) {
            if (this.ActionColl[i]._id == this.checkedIDs[0] && this.ActionColl[i].statut != '5e8c84c0b3a4f22544f6d4ad') {
                alert('vous devez selectionner une action de statut draft por la supprimer');
                window.location.reload();
              } else {
              this.actionService.deleteAction(this.checkedIDs[0]).subscribe((res: any) => {
                console.log(JSON.parse(JSON.stringify(res)));
                });
              }

          }
          alert('suppression avec succès');
          window.location.reload();
        } else {
         
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0 ; i < this.checkedIDs.length ; i++) {
          this.array = `${this.array}array=${this.checkedIDs[i]}&`;
          }
       
          this.actionService.deleteMultiAction(this.array.slice(0, -1)).subscribe((res: any) => {
           console.log(JSON.parse(JSON.stringify(res)));
            });
          alert('suppression avec succès');
          window.location.reload();
        }

      }
      modifier() {
        this.router.navigate([ 'dashboard/editAction/', this.checkedIDs[0] ]);
      }

      supprimerThm() {
        if ( this.checkedThmIDs.length === 1 ) {
          // tslint:disable-next-line: prefer-for-of
       
          console.log('id supp : ' + this.checkedThmIDs[0])
              this.plandAction.deleteTheme(this.checkedThmIDs[0]).subscribe((res: any) => {
                console.log('supp reussi ');
                });

              alert('suppression avec succès');
              window.location.reload();
        } else {
          console.log('checkedThmIDs' + this.checkedThmIDs);
          console.log('checkedThmIDs length' + this.checkedThmIDs.length);
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0 ; i < this.checkedThmIDs.length ; i++) {
          this.arrayThm = `${this.arrayThm}array=${this.checkedThmIDs[i]}&`;
          }
          console.log( this.arrayThm.slice(0, -1));
          this.plandAction.deleteThemeMulti(this.arrayThm.slice(0, -1)).subscribe((res: any) => {
            console.log(JSON.parse(JSON.stringify(res)));
            });
          alert('suppression avec succès');
          window.location.reload();
        }

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

      ajout(idTheme: string) {
        console.log('theme id lil ajout: '+ idTheme)
        this.router.navigate(['dashboard/addAction/' + this.idPa, idTheme]);
      }

      refresh() {
        location.reload();
      }
    

}
