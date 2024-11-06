import { Component } from '@angular/core';
import { RegistrationFormComponent } from './components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegistrationFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'aab-registration-form';
}
