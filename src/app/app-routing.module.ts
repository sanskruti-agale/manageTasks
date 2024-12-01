import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RagisterComponent } from './ragister/ragister.component';
import { AuthGuard } from './guards/auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RagisterComponent },
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard]  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Default route
  { path: 'admin-login', component: ForgotPasswordComponent },
  { path: 'admin', component: AdminDashboardComponent , canActivate: [AuthGuard]  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
