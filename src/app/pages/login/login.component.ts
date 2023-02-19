import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public hide = true;
  public loading = false;
  public error: string;
  public form: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  get formControl() {
    return this.form.controls;
  }

  onSubmit() {
    this.loading = true;
    if (this.form.invalid) {
      return;
    }
    this.authService
      .login(
        this.formControl['username'].value,
        this.formControl['password'].value
      )
      .pipe(first())
      .subscribe(
        () => {
          this.loading = false;
          this.router.navigate(['/jobs'], {
            replaceUrl: true,
          });
        },
        (err) => {
          if (err.status === 401) {
            this.error = 'Username or password is not correct!';
          }
          this.loading = false;
        }
      );
  }
}
