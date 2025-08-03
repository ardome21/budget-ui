import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-dialog',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent {
  readonly dialogRef = inject(MatDialogRef<LoginDialogComponent>);


  profileForm: FormGroup;
  isLoading = false;
  isSuccess = false;

  _userService = inject(UserService)

  constructor() {
    this.profileForm = new FormGroup({
        email: new FormControl('',[Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      });
    }

    get f() { return this.profileForm.controls; }


    onSubmit() {
    if (this.profileForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;

    const loginData = {
      email: this.f['email'].value,
      password: this.f['password'].value
    };

    this._userService.login(loginData).subscribe({
    next: (response) => {
      console.log('User Login successful:', response);
      if (response.success) {
        console.log(response.message);

        this.profileForm.reset();
      }

      this.isLoading = false;
      this.dialogRef.close()
    },
    error: (error) => {
      console.error('Error creating user:', error.error);
      this.isLoading = false;
    },
    complete: () => {
      console.log('User creation request completed');
    }
  });

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
