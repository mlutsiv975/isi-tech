import {Component, inject, OnInit} from '@angular/core';
import {ButtonComponent} from "../../components/button/button.component";
import {ButtonRole} from "../../components/button/button-role";
import {UserListComponent} from "../../components/user-list/user-list.component";
import {ModalComponent} from "../../components/modal/modal.component";
import {UserFormComponent} from "../../components/forms/user-form/user-form.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {UserService} from "../../services/user/user.service";
import {User} from "../../common/models/user/user.interface";
import { shareReplay, startWith, Subject, switchMap } from "rxjs";
import {NotificationService} from "../../services/notification/notification.service";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    ButtonComponent,
    UserListComponent,
    ModalComponent,
    UserFormComponent,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  protected readonly ButtonRoleEnum = ButtonRole;
  protected isCreateModalVisible = false;
  protected isEditModalVisible = false;

  private userService = inject(UserService);
  private notificationService = inject(NotificationService);
  private refreshUsers$ = new Subject<void>();

  public selectedUser: User | undefined;
  public users$ = this.refreshUsers$.pipe(
    startWith([]),
    switchMap(() => this.userService.getUsers()),
    shareReplay(1));

  constructor() {
  }

  openCreateUserModal() {
    this.isCreateModalVisible = true;
  }

  onUserItemClick(user: User) {
    this.selectedUser = user;
    this.isEditModalVisible = true;
  }

  createUser(formData: User) {
    this.userService.createUser(formData).subscribe({
      next: () => {
        this.isCreateModalVisible = false;
        this.refreshUsers$.next();
        this.notificationService.showSuccess('User successfully created');
      },
      error: (error) => this.notificationService.showError(error)
    });
  }

  updateUser(user: User) {
    this.userService.updateUser(user).subscribe({
      next: () => {
        this.isEditModalVisible = false;
        this.refreshUsers$.next();
        this.notificationService.showSuccess('User successfully updated');
      },
      error: (error) => this.notificationService.showError(error)
    });
  }

  deleteUser() {
    this.userService.deleteUser(this.selectedUser?.id!).subscribe({
      next: () => {
        this.isEditModalVisible = false;
        this.refreshUsers$.next();
        this.notificationService.showSuccess('User successfully deleted');
      },
      error: (error) => this.notificationService.showError(error)
    });
  }

  get userFullName() {
    const { first_name, last_name } = this.selectedUser || {};
    return `${first_name} ${last_name}`;
  }
}
