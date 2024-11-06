import { Component, HostBinding, input } from '@angular/core';
import { NotificationType } from './models/notification-type';

@Component({
  selector: 'app-notification',
  standalone: true,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  @HostBinding('class.is-error') get error() {
    return this.type() === NotificationType.ERROR;
  }
  @HostBinding('class.is-successful') get successful() {
    return this.type() === NotificationType.SUCCESSFUL;
  }

  type = input(NotificationType.SUCCESSFUL);
}
