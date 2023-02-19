import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  public isLoggedIn: boolean;
  public isAdmin: boolean;
  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.authService.currentUser.subscribe((user) => {
      const isValidUser = !!(user && Object.keys(user).length !== 0);
      this.isLoggedIn = isValidUser;
      this.isAdmin = user?.userrole === 'Admin';
    });
  }
  logout() {
    this.authService.logout();
    window.location.replace('/');
  }
}
