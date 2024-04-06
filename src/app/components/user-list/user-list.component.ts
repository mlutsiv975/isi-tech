import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {User} from "../../common/models/user/user.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  @Input() users: User[] | null = [];
  @Output() itemClicked: EventEmitter<User> = new EventEmitter<User>();

  private router = inject(Router);

  onRowClick(user: User) {
    this.itemClicked.emit(user);
  }

  redirectToView(user: User, clickEvent: MouseEvent) {
    clickEvent.stopPropagation();
    this.router.navigate(['/users', user.id]);
  }
}
