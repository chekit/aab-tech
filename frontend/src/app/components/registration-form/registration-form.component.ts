import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { RegistrationService } from '../../core/services/registration.service';
import { NotificationType } from '../../shared/components/notification/models/notification-type';
import { NotificationComponent } from '../../shared/components/notification/notification.component';
import { RegistrationResponse } from '../../shared/models';
import { RegistrationData } from '../../shared/models/registration-data';

interface ComponentState {
  error: Error | null;
  registered: RegistrationResponse | null;
}

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, NotificationComponent, NgClass],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
})
export class RegistrationFormComponent {
  private fb = inject(FormBuilder);
  private registrationService = inject(RegistrationService);

  NotificationType = NotificationType;

  protected state = signal<ComponentState>({
    error: null,
    registered: null,
  });

  protected registrationForm = this.fb.nonNullable.group(
    {
      username: ['', [Validators.required, Validators.maxLength(140)]],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/gi)]],
      fullname: [''],
    },
    {
      updateOn: 'blur',
    }
  );

  isFormValid$ = this.registrationForm.statusChanges.pipe(map(status => status === 'VALID'));

  protected register(): void {
    this.state.update(state => ({ ...state, error: null, registered: null }));

    this.registrationService.register(this.registrationForm.value as RegistrationData).subscribe({
      next: value => {
        this.state.update(state => ({ ...state, registered: value }));
        this.registrationForm.reset();
      },
      error: ({ error }) => {
        this.state.update(state => ({ ...state, error }));
      },
    });
  }
}
