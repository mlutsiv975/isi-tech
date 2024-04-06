import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {User} from "../../common/models/user/user.interface";

@Injectable({
  providedIn: 'root'
})
export class HttpMockService {
  private users: User[] = JSON.parse(localStorage.getItem('users') ?? '[]');

  getOne(username: string): Observable<User> {
    const user = this.users.find(u => u.username === username);
    if (!user) {
      throw new Error('User not found');
    }
    return of(user);
  }

  getList(): Observable<User[]> {
    return of(this.users);
  }

  post(user: User): Observable<User> {
    const userExists = this.users.some(u => u.username === user.username);
    if (userExists) {
      return throwError(() => 'User already exists');
    }
    const userWithId = {...user, id: this.generateId()};
    this.users = [...this.users, userWithId];
    this.saveUsers();
    return of(user);
  }

  put(user: User): Observable<User> {
    const userExists = this.users.some(u => user.id !== u.id && (u.username === user.username || u.email === user.email));
    if (userExists) {
      return throwError(() => 'User with provided username or email already exists');
    }
    const index = this.users.findIndex(u => u.id === user.id);
    this.users[index] = user;
    this.saveUsers();
    return of(user);
  }

  delete(id: string): Observable<null> {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      return throwError(() => 'User not found');
    }
    this.users = this.users.filter(u => u.id !== id);
    this.saveUsers();
    return of(null);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  private saveUsers(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
