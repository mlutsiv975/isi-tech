import {Component, inject, OnInit} from '@angular/core';
import {NotificationService} from "../../services/notification/notification.service";
import {NgClass, NgForOf} from "@angular/common";
import {Notification} from "../../common/models/notification/notification.interface";

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  private notificationService = inject(NotificationService);
  notifications: Notification[] = [];

  constructor() {}

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe(notification => {
      this.notifications.push(notification);
      setTimeout(() => this.removeNotification(notification), 3000);
    });
  }

  removeNotification(notification: Notification): void {
    const index = this.notifications.indexOf(notification);
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  }
}
