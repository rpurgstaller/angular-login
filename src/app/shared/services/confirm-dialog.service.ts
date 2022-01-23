import { Injectable } from '@angular/core';
import {ConfirmDialogComponent} from "../components/confirm-dialog/confirm-dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ConfirmDialogService {

  private dialogRef!: MatDialogRef<ConfirmDialogComponent>

  constructor(private dialog: MatDialog) { }

  public confirm(title: string, message: string): Observable<any> {

    this.dialogRef = this.dialog.open(ConfirmDialogComponent);
    this.dialogRef.componentInstance.title = title;
    this.dialogRef.componentInstance.message = message;

    return this.dialogRef.afterClosed();
  }
}
