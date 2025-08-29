import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  form = this.fb.group({
    username: [{ value: this.user?.username || '', disabled: true }],
    email: [{ value: this.user?.email || '', disabled: true }],
    firstName: [this.user?.firstName || '', Validators.required],
    lastName: [this.user?.lastName || '', Validators.required],
    phoneNumber: [this.user?.phoneNumber || '', Validators.required]
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    // Load user from localStorage first
    const raw = localStorage.getItem('mhbs_user');
    this.user = raw ? JSON.parse(raw) : null;
    
    if (this.user) {
      this.updateForm();
    }
  }
  
  private updateForm() {
    this.form.patchValue({
      username: this.user?.username || '',
      email: this.user?.email || '',
      firstName: this.user?.firstName || '',
      lastName: this.user?.lastName || '',
      phoneNumber: this.user?.phoneNumber || ''
    });
  }

  save() {
    if (this.form.invalid) return;
    
    // Update user object with form values
    const formValue = this.form.getRawValue();
    const updated: User = {
      ...this.user,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      phoneNumber: formValue.phoneNumber
    } as User;
    
    // Save to localStorage (in a real app, you'd call backend API)
    localStorage.setItem('mhbs_user', JSON.stringify(updated));
    this.user = updated;
    alert('Profile updated successfully!');
  }
}