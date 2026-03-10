import { Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogVariant, IDialog } from '../../models/dialog/IDialog.interface';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { IDialogResult } from '../../models/dialog/IDialogResult.interface';

@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
})
export class Dialog implements OnInit{
  private dialogRef = inject(MatDialogRef<Dialog, IDialogResult | false>);
  public data = inject(MAT_DIALOG_DATA) as IDialog;
  dialogForm = new FormGroup({})

  ngOnInit(): void {
    this.buildForm(this.data.variant)
  }

  buildForm(variant: DialogVariant){
    switch(variant){
      case 'createDialog':
        this.dialogForm.addControl('title', new FormControl('', { nonNullable: true, validators: [Validators.required] }))
        this.dialogForm.addControl('description', new FormControl('', { nonNullable: true, validators: [Validators.required] }))
        break
      case 'updateDialog':
        this.dialogForm.addControl('id', new FormControl('', { nonNullable: true, validators: [Validators.required] }))
        this.dialogForm.addControl('title', new FormControl('', { nonNullable: true, validators: [Validators.required] }))
        this.dialogForm.addControl('description', new FormControl('', { nonNullable: true, validators: [Validators.required] }))
        break
      case 'deleteDialog':
        this.dialogForm.addControl('id', new FormControl('', { nonNullable: true, validators: [Validators.required] }))
        break
      default:
        break
    }
  }

  close(result: boolean): void {
    if (!result){
      this.dialogRef.close(false);
      return;
    }
    if (this.dialogForm.valid) {
      this.dialogRef.close(this.dialogForm.value as IDialogResult);
    }
  }

  getDialogType() {
    switch (this.data.variant) {
      case 'createDialog':
        return 'create';

      case 'updateDialog':
        return 'update';

      case 'deleteDialog':
        return 'delete';

      default:
        return 'forbidden';
    }
  }
}
