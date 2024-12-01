import { Component } from '@angular/core';
import { AddNewComponent } from '../add-new/add-new.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CommonService } from '../services/common.service';
import { Task, User } from '../interfaces';

 

 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private dialog: MatDialog,
    private commonservice: CommonService
  ){

  }
  displayedColumns: string[] = ['name', 'description', 'status', 'actions'];

  user: User = {} as User;  
  tasks: Task[] = [];  


  tasksCount = {
    pending: 0,
    completed: 0,
    delayed: 0,
    deleted: 0,
    continue: 0,
  };

  selectedTasks: any[] = [];
  selectedCategory: string = 'Continue';

  ngOnInit(): void {
    debugger
    const userdata = localStorage.getItem('item'); // Retrieve data from localStorage
    let user = userdata ? JSON.parse(userdata) : []; // Parse or use an empty array as fallback
    this.user = user
    this.getUserByEmail(user.email)
 
  }

  calculateCounts(): void {
    this.tasksCount = {
      pending: this.tasks.filter((t) => t.status === 'pending').length,
      completed: this.tasks.filter((t) => t.status === 'completed').length,
      delayed: this.tasks.filter((t) => t.status === 'delayed').length,
      deleted: this.tasks.filter((t) => t.status === 'deleted').length,
      continue: this.tasks.filter((t) => t.status === 'continue').length,
    };
  }

  showTasks(category: string): void {
    this.selectedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    this.selectedTasks = this.tasks.filter((task) => task.status === category);
  }

  updateStatus(task: any, status: string): void {
    task.status = status;
    this.calculateCounts();
    this.showTasks(this.selectedCategory.toLowerCase());
    this.triggerBlink(status); // Trigger blink for the updated status card
      
    

  }

  deleteTask(task: any): void {
    if (task.status !== 'deleted') {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        height: '250px',
        data: { taskName: task.name },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          task.status = 'deleted';
          this.calculateCounts();
          this.showTasks(this.selectedCategory.toLowerCase());
          this.triggerBlink('deleted'); // Trigger blink for the deleted card
        }
      });
    }
  }
  

  openAddNewDialog(isEdit: boolean, taskData?: any): void {
    const dialogRef = this.dialog.open(AddNewComponent, {
      width: '600px',
      data: { 
        isEdit: isEdit,  // Passing edit flag
        taskData: taskData  // Pass task data for editing (optional)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      debugger
      this.getUserByEmail(result.email)

    });
  }

  blinkingCategory: string | null = null;

triggerBlink(category: string): void {
  this.blinkingCategory = category;

  // Remove the blink effect after a short delay
  setTimeout(() => {
    this.blinkingCategory = null;
  }, 1000); // Adjust the time as needed (e.g., 1000ms = 1 second)

  this.commonservice.updateTasksByEmail(this.user, this.user.tasks).subscribe(

  );
}

// Modify the updateStatus and deleteTask methods to include triggerBlink
 

getUserByEmail(email: string): void {
  debugger
  this.commonservice.getById(email).subscribe(
    (data) => {
      debugger
        this.tasks = data[0].tasks
       this.user = data[0];
       this.calculateCounts();
       this.showTasks('continue'); // Show "Continue" tasks by default
    },
    (error) => {
      console.error('Error fetching user:', error);
    }
  );
}

logoutclick(){
  localStorage.clear()
}
  
}