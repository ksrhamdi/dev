import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HttpResponse } from '@angular/common/http';
import {AlertService} from '../../services/AlertService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string>();
  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) { }

message: String = '';
check = false;

  
  test = true;
    ngOnInit(): void {
    }
  
    login(loginForm: NgForm) {
      console.log(this.message);
      console.log(loginForm.value['remember-me']);
      this.authService.login(loginForm.value.userLogin, loginForm.value.password).subscribe((res: HttpResponse<any>) => {
            if (res.status === 200) {
              // we have logged in successfully
               this.router.navigate(['/dashboard']);
            } else {
               this.message = 'vérifier vos coordonnées';
               this.test = false;
               console.log(this.message);
            }
  
          });
        }
        radiodChangeThmHandler(event: any) {
          if (event.target.checked) {
            console.log('event click theme: ' + event.target.value);
            this.check = true;
            localStorage.setItem('remember', 'true');
            console.log( this.check);
          } else {
            this.check = false;
            console.log(this.check);
            localStorage.setItem('remember', 'false');
          }
        }
        // tslint:disable-next-line: use-lifecycle-interface
        ngOnDestroy() {
          console.log('foo destroy');
        }
      }
