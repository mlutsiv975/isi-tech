import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Notification} from "../../common/models/notification/notification.interface";
import {NotificationType} from "../../common/enum/notifications/notification-type";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly _notifications = new Subject<Notification>();

  readonly notifications$ = this._notifications.asObservable();

  showSuccess(message: string): void {
    this._notifications.next({ type: NotificationType.SUCCESS, message });
  }

  showError(message: string): void {
    this._notifications.next({ type: NotificationType.ERROR, message });
  }
}
