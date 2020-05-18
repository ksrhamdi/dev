import { AddpactionComponent } from 'src/app/pages/modules/addpaction/addpaction.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Users } from 'src/app/Model/users.model';

import {AuthService} from '../../../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  implements OnInit {
  isPopupOpened = true;
  closeResult: string;
user: Users;
  name: string;
  constructor(private modalService: NgbModal,private router: Router, private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.getCurrentId().subscribe((user: Users)=>{
      console.log(user.firstName);
      this.user = user;
      this.name = user.firstName+" "+user.lastName
                 });
  }
  
  open(content) {
   
   
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  logout() {
    this.authService.logout();
}
retourr() {
  // location.reload();
  location.reload();
}
}
