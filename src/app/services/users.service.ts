
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
import { Users } from '../Model/users.model';

@Injectable()
export class UserService {
  selectedUser: Users;
  users: Users[];
  readonly baseUrl = 'http://localhost:3000/userss';
  constructor(private http: HttpClient) {}
    getUser(usr: Users) {
      return this.http.get(this.baseUrl);
    }

    getUsersList() {
      return this.http.get(this.baseUrl);
    }
    getUserbyID(id: string) {
      return this.http.get(`http://localhost:3000/userss/${id}`);
    }
   }

