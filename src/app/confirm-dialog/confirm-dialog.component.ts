import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    public matDialogRef: MatDialogRef<ConfirmDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true); // Return true if confirmed
  }

  onCancel(): void {
    this.dialogRef.close(false); // Return false if canceled
  }

  saveAndClose(): void {
    this.matDialogRef.close('');
 }
}
