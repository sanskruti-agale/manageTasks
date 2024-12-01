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
      if(taskIndex == -1){
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
}