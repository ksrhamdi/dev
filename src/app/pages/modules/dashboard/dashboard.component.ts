import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  remember:any;
  constructor() { }

  ngOnInit(): void {
   this.remember = localStorage.getItem('remember');
    console.log(this.remember);
  }
  // tslint:disable-next-line: use-lifecycle-interface
 
  
}
