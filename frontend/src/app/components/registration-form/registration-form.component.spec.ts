import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { RegistrationService } from '../../core/services/registration.service';
import { RegistrationFormComponent } from './registration-form.component';
import { RegistrationFormPage } from './registration-form.component.spec-page';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let page: RegistrationFormPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationFormComponent],
      providers: [
        {
          provide: RegistrationService,
          useValue: {
            register: () => of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    page = new RegistrationFormPage(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable submit button by default', () => {
    expect(page.submitButton.disabled).toBeTruthy();
  });

  it('should enable submit button once form filled in', () => {
    setInputValue(page.inputUsername, 'test');
    setInputValue(page.inputPassword, 'test');
    setInputValue(page.inputEmail, 'test@test.nl');

    fixture.detectChanges();

    expect(page.submitButton.disabled).toBeFalsy();
  });

  function setInputValue(el: HTMLInputElement, value: string): void {
    el.value = value;
    el.dispatchEvent(new Event('input'));
  }
});
