import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ragister',
  templateUrl: './ragister.component.html',
  styleUrl: './ragister.component.css'
})
export class RagisterComponent {
  registerForm!: FormGroup; // Reactive form instance
  formSubmitted = false; // Flag to check if the form is submitted

  constructor(private fb: FormBuilder ,
    private commonservice: CommonService,
    private router: Router

  ) {}

  ngOnInit(): void {
    // Initialize the form with validations
    this.registerForm = this.fb.group(
      {
        name: [
          '',
          [Validators.required, Validators.minLength(3)], // Name validation
        ],
        email: [
          '',
          [Validators.required, Validators.email], // Email validation
        ],
        password: [
          '',
          [Validators.required, Validators.minLength(6)], // Password validation
        ],
        confirmPassword: [
          '',
          [Validators.required], // Confirm Password validation
        ],
      },
      { validator: this.passwordsMatchValidator } // Custom validator for matching passwords
    );
  }

  // Custom validator to check if password and confirm password match
  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Getters for form controls to avoid repetitive code in the template
  get nameControl() {
    return this.registerForm.get('name');
  }

  get emailControl() {
    return this.registerForm.get('email');
  }

  get passwordControl() {
    return this.registerForm.get('password');
  }

  get confirmPasswordControl() {
    return this.registerForm.get('confirmPassword');
  }

  // Validate and submit the form
  validateAndSubmit(): void {
    this.formSubmitted = true;

    if (this.registerForm.valid) {
      debugger
      let data = {
        email: this.registerForm.get('email')?.value,   
        name: this.registerForm.get('name')?.value,    
        tasks: [],                                      
        password: this.registerForm.get('confirmPassword')?.value,   
        id: null                 
      };
      
      this.commonservice.addUser(data).subscribe(res =>{
        debugger
        this.router.navigate(['/login']); // Redirect to login page

      })

      console.log('Registration successful:', this.registerForm.value);
      // Perform the registration logic here
    } else {
      console.error('Form is invalid');
    }
  }
}
