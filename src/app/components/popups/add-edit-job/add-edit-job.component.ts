import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobsService } from 'src/app/services/jobs.service';
import { JobDialogData } from 'src/types/general';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-edit-job.component.html',
  styleUrls: ['./add-edit-job.component.css'],
})
export class AddEditJobComponent {
  public form: FormGroup;
  loading = false;
  public dialogData: JobDialogData;

  minDate = Date.now;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: { dialogData: JobDialogData },
    private jobService: JobsService
  ) {
    this.dialogData = data.dialogData;
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(
        this.dialogData.formData?.name || '',
        Validators.required
      ),
      description: new FormControl(
        this.dialogData.formData?.description || '',
        Validators.required
      ),
      responsibilities: new FormControl(
        this.dialogData.formData?.responsibilities || '',
        Validators.required
      ),
      skills: new FormControl(
        this.dialogData.formData?.skills || '',
        Validators.required
      ),
      category: new FormControl(
        this.dialogData.formData?.category || '',
        Validators.required
      ),
      maxApplications: new FormControl(
        this.dialogData.formData?.maxApplications || 0,
        Validators.required
      ),
      startDate: new FormControl<Date | null>(
        this.dialogData.formData?.startDate || null,
        Validators.required
      ),
      endDate: new FormControl<Date | null>(
        this.dialogData.formData?.endDate || null,
        Validators.required
      ),
    });
  }

  onSubmit() {
    if (this.dialogData.action == 'add') {
      this.jobService.addJob(this.form.value).subscribe((res) => {
        if (res) {
          window.location.reload();
        }
      });
    } else {
      this.jobService
        .editJob({ ...this.form.value, id: this.dialogData.formData.id })
        .subscribe((res) => {
          if (res) {
            window.location.reload();
          }
        });
    }
  }
}
