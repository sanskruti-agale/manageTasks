import { Component } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private loginService: CommonService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {

  }
  onLogin(): void {
    debugger
    this.loginService.login(this.email, this.password).subscribe(
      (response) => {
        debugger
        this.router.navigate(['/dashboard']); // Redirect to login page
        this._snackBar.open('Log in Succesful!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        let a = JSON.stringify(response);
        localStorage.setItem('item', a)

        return true;
      },
      (error) => {
        console.error('Login failed:', error);
        // this.errorMessage = 'Invalid credentials. Please try again.';
      }
    );
  }


}


