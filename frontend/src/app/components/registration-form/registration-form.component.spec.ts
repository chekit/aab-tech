import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { RegistrationFormComponent } from './registration-form.component';
import { RegistrationFormPage } from './registration-form.component.spec-page';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let page: RegistrationFormPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationFormComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
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

  it('should disable submit button once required field reset', () => {
    setInputValue(page.inputUsername, 'test');
    setInputValue(page.inputPassword, 'test');
    setInputValue(page.inputEmail, 'test@test.nl');

    fixture.detectChanges();

    expect(page.submitButton.disabled).toBeFalsy();

    setInputValue(page.inputPassword, '');

    fixture.detectChanges();

    expect(page.submitButton.disabled).toBeTruthy();
  });

  it('should show error notification if service fails', fakeAsync(() => {
    setInputValue(page.inputUsername, 'test');
    setInputValue(page.inputPassword, 'test');
    setInputValue(page.inputEmail, 'test@test.nl');

    fixture.detectChanges();

    const ctrl = TestBed.inject(HttpTestingController);

    page.submitButton.click();

    const req = ctrl.expectOne('http://localhost:3000/register');
    req.error(new ProgressEvent('Test error'));

    tick();
    fixture.detectChanges();

    expect(page.errorNotification).toBeTruthy();
  }));

  it('should show successful notification if data sent successfully', fakeAsync(() => {
    setInputValue(page.inputUsername, 'test');
    setInputValue(page.inputPassword, 'test');
    setInputValue(page.inputEmail, 'test@test.nl');

    fixture.detectChanges();

    const ctrl = TestBed.inject(HttpTestingController);

    page.submitButton.click();

    const req = ctrl.expectOne('http://localhost:3000/register');
    req.flush({ status: 'success', message: 'Registration data received successfully' });

    tick();
    fixture.detectChanges();

    expect(page.successNotification).toBeTruthy();
    expect(page.successNotification.textContent?.trim()).toBe('Registration data received successfully');
  }));

  it('should show username length error', () => {
    setInputValue(page.inputUsername, 'test'.repeat(140));
    setInputValue(page.inputPassword, 'test');
    setInputValue(page.inputEmail, 'test@test.nl');

    fixture.detectChanges();

    expect(page.usernameLengthError).toBeTruthy();

    setInputValue(page.inputUsername, 'test');

    fixture.detectChanges();

    expect(page.usernameLengthError).toBeFalsy();
  });

  it('should show email format error', () => {
    setInputValue(page.inputUsername, 'test');
    setInputValue(page.inputPassword, 'test');
    setInputValue(page.inputEmail, 'test@test.');

    fixture.detectChanges();

    expect(page.emailFormatError).toBeTruthy();

    setInputValue(page.inputEmail, 'test');

    fixture.detectChanges();

    expect(page.emailFormatError).toBeTruthy();

    setInputValue(page.inputEmail, 'test@test.nl');

    fixture.detectChanges();

    expect(page.emailFormatError).toBeFalsy();
  });

  it("should add 'is-error' class if there is input error", () => {
    setInputValue(page.inputUsername, 'test'.repeat(140));
    setInputValue(page.inputEmail, 'test@test.');

    fixture.detectChanges();

    expect(page.inputUsername.classList).toContain('is-error');
    expect(page.inputEmail.classList).toContain('is-error');
  });

  function setInputValue(el: HTMLInputElement, value: string): void {
    el.value = value;
    el.dispatchEvent(new Event('input'));
    el.dispatchEvent(new Event('blur'));
  }
});
