import { Injectable } from '@angular/core';
import { HttpMockService } from '../http-mock/http-mock.service';
import {User} from "../../common/models/user/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpMockService: HttpMockService) {}

  createUser(userData: User) {
    return this.httpMockService.post(userData);
  }

  updateUser(user: User) {
    return this.httpMockService.put(user);
  }

  deleteUser(userId: string) {
    return this.httpMockService.delete(userId);
  }

  getUser(userId: string) {
    return this.httpMockService.getOne(userId);
  }

  getUsers() {
    return this.httpMockService.getList();
  }
}
