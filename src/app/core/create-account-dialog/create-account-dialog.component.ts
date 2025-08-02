import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-account-dialog',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-account-dialog.component.html',
  styleUrl: './create-account-dialog.component.scss'
})
export class CreateAccountDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CreateAccountDialogComponent>);

  profileForm: FormGroup;
  isLoading = false;
  message = '';
  isSuccess = false;

  constructor() {
    this.profileForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    }, {validators: this.passwordMatchValidator()});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  passwordMatchValidator(): ValidatorFn {
    return (form: AbstractControl): { [key: string]: any } | null => {
      const password = form.get('password');
      const confirmPassword = form.get('confirmPassword');

      if (password && confirmPassword && password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }

      return null;
    };
  }

  get f() { return this.profileForm.controls; }

  onSubmit() {
    console.log("Profile: ", this.profileForm)
    if (this.profileForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    this.message = '';

    const userData = {
      email: this.f['email'].value,
      password: this.f['password'].value,
      first_name: this.f['firstName'].value || '',
      last_name: this.f['lastName'].value || ''
    };
    console.log("User Data: ", userData)
    this.isLoading = false

    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });

    // this.http.post(this.apiUrl, userData, { headers }).subscribe({
    //   next: (response: any) => {
    //     console.log('User created successfully:', response);
    //     this.isSuccess = true;
    //     this.message = 'Profile created successfully!';
    //     this.profileForm.reset();
    //     this.isLoading = false;
    //   },
    //   error: (error) => {
    //     console.error('Error creating user:', error);
    //     this.isSuccess = false;
    //     this.isLoading = false;

    //     if (error.error && error.error.error) {
    //       this.message = error.error.error;
    //     } else if (error.status === 409) {
    //       this.message = 'User with this email already exists';
    //     } else if (error.status === 400) {
    //       this.message = 'Invalid input data';
    //     } else {
    //       this.message = 'An error occurred. Please try again.';
    //     }
    //   }
    // });
  }

  private markFormGroupTouched() {
    Object.keys(this.profileForm.controls).forEach(key => {
      const control = this.profileForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper methods for template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.profileForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['passwordMismatch']) return 'Passwords do not match';
    }
    return '';
  }

}
