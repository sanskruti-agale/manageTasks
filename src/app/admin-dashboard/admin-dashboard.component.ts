import { Component } from '@angular/core';
import { AdminServiceService } from '../services/admin-service.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Task, User } from '../interfaces';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  animations: [
    trigger('cardHover', [
      state(
        'hover',
        style({
          transform: 'scale(1.05)',
          boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)',
        })
      ),
      state('default', style({ transform: 'scale(1)', boxShadow: 'none' })),
      transition('default <=> hover', animate('0.3s ease')),
    ]),
  ],
})
 
export class AdminDashboardComponent {
  users: any[] = [];
  editingUser: any = null;
  editingTask: any = null;

  constructor(private adminService: AdminServiceService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.adminService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  editUser(user: any): void {
    this.editingUser = { ...user };
  }

  saveUser(): void {
    if (this.editingUser) {
      this.adminService.updateUser(this.editingUser).subscribe(
        () => {
          this.fetchUsers();
          this.editingUser = null;
        },
        (error) => console.error('Error updating user:', error)
      );
    }
  }

  deleteUser(user: any): void {
    if (confirm(`Are you sure you want to delete user: ${user.name}?`)) {
      this.adminService.deleteUser(user.id).subscribe(
        () => this.fetchUsers(),
        (error) => console.error('Error deleting user:', error)
      );
    }
  }

  editTask(task: any): void {
    this.editingTask = { ...task };
  }

  saveTask(user: any): void {
    if (this.editingTask) {
      const taskIndex = user.tasks.findIndex((t: any) => t.id === this.editingTask.id);
      user.tasks[taskIndex] = this.editingTask;
      this.adminService.updateUser(user).subscribe(
        () => {
          this.fetchUsers();
          this.editingTask = null;
        },
        (error) => console.error('Error updating task:', error)
      );
    }
  }

  deleteTask(user: any, task: any): void {
    if (confirm(`Are you sure you want to delete task: ${task.name}?`)) {
      user.tasks = user.tasks.filter((t: any) => t.id !== task.id);
      this.adminService.updateUser(user).subscribe(
        () => this.fetchUsers(),
        (error) => console.error('Error deleting task:', error)
      );
    }
  }


  addTask(user : User){
    debugger
    let task : Task = {
      id:  Math.floor(100000 + Math.random() * 900000).toString(),
      name: null,
      status: null,
      description: null
    }
    this.editingTask = task;

    user.tasks.push(task)
  }
}