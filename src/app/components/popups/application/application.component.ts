import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map } from 'rxjs';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
})
export class ApplicationDialogComponent {
  @Output() submitClicked = new EventEmitter<any>();
  public form: FormGroup;
  jobId: string;
  formSubmit: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: { jobId: string },
    private jobService: JobsService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ApplicationDialogComponent>
  ) {
    this.jobId = data.jobId;
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
    });
    this.formSubmit = false;
  }

  onApply() {
    this.jobService.applyForJob(this.jobId, this.form.value).subscribe(
      () =>
        this._snackBar.open('Application is sent successfully', 'close', {
          duration: 3000,
        }),
      (err) => {
        if (err.status === 400) {
          this._snackBar.open(
            'You have  already applied for this job',
            'close',
            { duration: 3000 }
          );
        }
        return err;
      }
    );
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
