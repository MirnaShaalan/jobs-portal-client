import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  public isLoggedIn: boolean;
  constructor(private authService: AuthenticationService) {}
  ngOnInit() {
    this.authService.currentUser.subscribe((user) => {
      const isValidUser = !!(user && Object.keys(user).length !== 0);
      this.isLoggedIn = isValidUser;
    });
  }
}
