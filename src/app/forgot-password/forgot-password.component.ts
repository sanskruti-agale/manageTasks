import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = ''; // To store the entered email address
  isLoading: boolean = false; // To show loading spinner while sending email

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  // Method to handle form submission (request reset email)
  onSubmit(): void {
    if (this.email) {
      this.isLoading = true;
      // Simulate calling the backend service to send the password reset email
      setTimeout(() => {
        // Normally, here you would call an API to send the password reset email.
        console.log(`Password reset email sent to: ${this.email}`);

        this.snackBar.open('Password reset email sent! Please check your inbox.', 'Close', {
          duration: 5000,
        });

        this.router.navigate(['/login']); // Redirect to login page
        this.isLoading = false;
      }, 2000);
    } else {
      this.snackBar.open('Please enter your email address', 'Close', {
        duration: 3000,
      });
    }
  }

  otp = ''
  generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    this.otp = otp;
  }

  isOTPSEND = false
  sendEmail() {

    const serviceID = 'service_pqs9fih'; // Replace with your EmailJS service ID
    const templateID = 'template_b0ku2pj'; // Replace with your EmailJS template ID
    const userID = 'IPK9k4LGvY2nfdcyC'; // Replace with your EmailJS user ID
    this.generateOTP()
    const templateParams = {
       email: 'sanskrutiagale48@gmail.com',
      message: this.otp 
    };

    
    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response: EmailJSResponseStatus) => {
          debugger
          this.isOTPSEND = true

      }, (error) => {
        debugger
       });
  }
  userOTP = ''

  varifyOTP(){
    if(this.otp == this.userOTP){
      this.router.navigate(['/admin']); // Redirect to login page
      localStorage.setItem('item' , "ADMIN")
    }
  }

}