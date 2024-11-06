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
    return this.de.query(By.css('[data-test="submit-button"]'));
  }
}
