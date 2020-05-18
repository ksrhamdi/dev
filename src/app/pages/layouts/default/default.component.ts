import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent {

  sideBarOpen = true;

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


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
