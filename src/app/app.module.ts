import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LandingComponent } from './pages/landing/landing.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JobCardComponent } from './components/job-card/job-card.component';
import { MyJobsComponent } from './pages/my-jobs/my-jobs.component';
import { DeleteJobComponent } from './components/popups/delete-job/delete-job.component';
import { AddEditJobComponent } from './components/popups/add-edit-job/add-edit-job.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { ApplicationDialogComponent } from './components/popups/application/application.component';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavigationComponent,
    LandingComponent,
    JobsComponent,
    JobCardComponent,
    MyJobsComponent,
    DeleteJobComponent,
    AddEditJobComponent,
    SnackbarComponent,
    ApplicationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
