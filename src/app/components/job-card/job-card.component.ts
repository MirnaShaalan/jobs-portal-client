import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/types/general';
import { AddEditJobComponent } from '../popups/add-edit-job/add-edit-job.component';
import { DeleteJobComponent } from '../popups/delete-job/delete-job.component';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import { JobsService } from 'src/app/services/jobs.service';
import { ApplicationDialogComponent } from '../popups/application/application.component';
dayjs.extend(relativeTime);

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css'],
})
export class JobCardComponent {
  @Input()
  isAdmin: boolean;
  @Input() isLoggedIn: boolean;
  @Input() isUserJob: boolean;
  @Input() jobData: Job;
  public timeRemaining: string;
  public isJobExpired: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public deleteDialog: MatDialog,
    public editDialog: MatDialog,
    private jobService: JobsService
  ) {}

  ngOnInit() {
    const endDateFormatted = dayjs(this.jobData.endDate);
    this.timeRemaining = endDateFormatted.fromNow();
    if (this.timeRemaining.includes('ago')) {
      this.isJobExpired = true;
    }
  }

  openDeleteDialog() {
    const dialogRef = this.deleteDialog.open(DeleteJobComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.jobService.deleteJob(this.jobData.id).subscribe(() => {
          window.location.reload();
        });
      }
    });
  }

  openApplyDialog() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.deleteDialog.open(ApplicationDialogComponent, {
        data: { jobId: this.jobData.id },
      });
    }
  }

  openEditDialog(title: string, buttonText: string, action: 'add' | 'update') {
    this.editDialog.open(AddEditJobComponent, {
      data: {
        dialogData: { formData: this.jobData, title, buttonText, action },
      },
    });
  }
}
