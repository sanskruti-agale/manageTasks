import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../services/common.service';
import { Task, User } from '../interfaces';
import { AdminServiceService } from '../services/admin-service.service';
 
@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrl: './add-new.component.css'
})
export class AddNewComponent {
  isEdit: boolean = false;
  taskData: any = {
    id : null,
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: '',
    additionalInfo: '' // New property for additional input
  };
  user: User = {} as User;

  constructor(
    private dialogRef: MatDialogRef<AddNewComponent>,
    public matDialogRef: MatDialogRef<AddNewComponent>,
    private commonservice: CommonService,
    private adminService: AdminServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    const userdata = localStorage.getItem('item'); // Retrieve data from localStorage
    let user = userdata ? JSON.parse(userdata) : []; // Parse or use an empty array as fallback
    this.user = user;
    this.getUserByEmail(this.user.email)
    debugger
    // Check if it's an edit or add action
    if (data) {
      this.isEdit = data.isEdit;
      let datas = data.taskData
      this.taskData = datas || {
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        status: '',
        additionalInfo: ''
      };
    }
  }

  // Method to close the dialog
  closeDialog(): void {
    this.dialogRef.close();
  }

  // Method to handle save action (Add or Edit)
  saveTask(): void {
     debugger
      const taskIndex =  this.user.tasks.findIndex((t: any) => t.id === this.data.taskData.id);
      if(this.data.taskData.id == undefined ||this.data.taskData.id ==  null ){
        this.taskData.id = this.user.tasks.length
        this.user.tasks[this.user.tasks.length] = this.taskData;
      }else{
        
        this.user.tasks[taskIndex] = this.taskData;

      }
      this.adminService.updateUser(this.user).subscribe(
        () => {
          this.matDialogRef.close(this.user);

          },
        (error) => console.error('Error updating task:', error)
      );
    

  }

  saveAndClose(): void {
    this.matDialogRef.close('');
  }

  getUserByEmail(email: string): void {
     this.commonservice.getById(email).subscribe(
      (data) => {
        debugger
          this.user = data[0];
      
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }
}