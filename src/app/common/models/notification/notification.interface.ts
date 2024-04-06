import {NotificationType} from "../../enum/notifications/notification-type";

export interface Notification {
  type: NotificationType;
  message: string;
}
