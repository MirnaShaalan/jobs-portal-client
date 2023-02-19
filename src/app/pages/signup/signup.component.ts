import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  hidePassword = true;
  public loading = false;
  public form: FormGroup;
  public error: string;

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
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
      .signup(this.form.value)
      .pipe(first())
      .subscribe(
        () => {
          this.loading = false;
          this.router.navigate(['/jobs'], {
            replaceUrl: true,
          });
        },
        (error) => {
          this.loading = false;
          if (error.status === 400) {
            this.error = 'Username is not available try another one';
          }
        }
      );
  }
}
