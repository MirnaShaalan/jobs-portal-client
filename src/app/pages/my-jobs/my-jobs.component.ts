import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { JobsService } from 'src/app/services/jobs.service';
import { Job } from 'src/types/general';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css'],
})
export class MyJobsComponent {
  isLoggedIn: boolean;
  isUserJob = true;
  isLoading = true;
  userJobs: Job[];
  constructor(
    private authService: AuthenticationService,
    private jobsService: JobsService
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe((user) => {
      const isValidUser = !!(user && Object.keys(user).length !== 0);
      this.isLoggedIn = isValidUser;
    });
    this.jobsService.getUserJobs().subscribe(
      (res) => {
        this.userJobs = res;
      },
      null,
      () => (this.isLoading = false)
    );
  }
}
