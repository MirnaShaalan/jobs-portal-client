import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditJobComponent } from 'src/app/components/popups/add-edit-job/add-edit-job.component';
import { Job } from 'src/types/general';
import { JobsService } from 'src/app/services/jobs.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';
import { JobsResponse } from 'src/types/api';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent {
  public isAdmin: boolean;
  public isLoggedIn: boolean;
  public data: Job[];
  public isEmptyArray: boolean;
  public form: FormGroup;
  public isLoading: boolean = true;
  public pageEvent: any;
  public page: number;
  public numberOfJobs: number;
  public numberOfPages: number;

  constructor(
    private authService: AuthenticationService,
    private jobsService: JobsService,
    public dialog: MatDialog
  ) {
    this.form = new FormGroup({
      search: new FormControl(''),
    });
  }

  ngOnInit() {
    this.authService.currentUser.subscribe((user) => {
      const isValidUser = !!(user && Object.keys(user).length !== 0);
      this.isLoggedIn = isValidUser;
      this.isAdmin = user?.userrole === 'Admin';
    });

    this.form
      .get('search')
      ?.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        startWith(''),
        switchMap((search) => this.jobsService.getJobs(search))
      )
      .subscribe(
        (response: JobsResponse) => {
          this.data = response.jobs;
          this.isEmptyArray = this.data.length === 0;
          this.numberOfJobs = response.jobsCount;
          this.numberOfPages = response.pagesCount;
          this.isLoading = false;
        },
        null,
        () => (this.isLoading = false)
      );
  }

  openAddJobDialog(title: string, buttonText: string, action: 'add' | 'edit') {
    const dialogRef = this.dialog.open(AddEditJobComponent, {
      data: {
        dialogData: { formData: null, title, buttonText, action },
      },
    });
  }

  onPaginateChange(event: any) {
    const page = event.pageIndex + 1;
    this.page = page;
    const search = this.form.get('search')?.value;
    this.jobsService
      .getJobs(search, page)
      .subscribe((response: JobsResponse) => (this.data = response.jobs));
  }
}
