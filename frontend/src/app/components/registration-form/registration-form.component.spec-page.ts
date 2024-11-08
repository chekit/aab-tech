import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RegistrationFormComponent } from './registration-form.component';

export class RegistrationFormPage {
  private de: DebugElement;

  constructor(private fixture: ComponentFixture<RegistrationFormComponent>) {
    this.de = fixture.debugElement;
  }

  get submitButton() {
    return this.fetchNativeElement<HTMLButtonElement>('[data-test="submit-button"]');
  }
  get inputUsername() {
    return this.fetchNativeElement<HTMLInputElement>('[data-test="input-username"]');
  }
  get inputPassword() {
    return this.fetchNativeElement<HTMLInputElement>('[data-test="input-password"]');
  }
  get inputEmail() {
    return this.fetchNativeElement<HTMLInputElement>('[data-test="input-email"]');
  }
  get inputFullname() {
    return this.fetchNativeElement<HTMLInputElement>('[data-test="input-fullname"]');
  }

  get errorNotification() {
    return this.fetchNativeElement<HTMLElement>('[data-test="error-notification"]');
  }

  get successNotification() {
    return this.fetchNativeElement<HTMLElement>('[data-test="success-notification"]');
  }

  get usernameLengthError() {
    return this.fetchNativeElement<HTMLElement>('[data-test="username-length-error"]');
  }

  get emailFormatError() {
    return this.fetchNativeElement<HTMLElement>('[data-test="email-format-error"]');
  }

  private fetchNativeElement<T>(selector: string): T {
    return this.de.query(By.css(selector))?.nativeElement;
  }
}
