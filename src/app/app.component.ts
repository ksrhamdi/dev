import { Component,HostListener } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  remember = localStorage.getItem('remember') ;
  
  // @HostListener("window:beforeunload",["$event"])
  //   clearLocalStorage(event){
  //     if(this.remember != "true"){
  //       localStorage.removeItem('user-id');
  //       localStorage.removeItem('x-access-token');
  //       localStorage.removeItem('x-refresh-token');
  //       localStorage.removeItem('remember');
  //     }
  //   }
  title = 'dashboard-pactions';
   // pour le time picker
   date: Date = new Date();
   settings = {
       bigBanner: true,
       timePicker: false,
       format: 'dd-MM-yyyy',
       defaultOpen: true
    }
   // pour multisites
siteList = [
  {
      name: 'Sousse'
  },
  {
      name: 'France'
  } // ect ...
];

  //pour traduction
 constructor(public translate: TranslateService) {
  translate.addLangs(['fr', 'en']);
  translate.setDefaultLang('fr');
  const browserLang = translate.getBrowserLang();
  translate.use(browserLang.match(/fr|en/) ? browserLang : 'fr');

 }

}
