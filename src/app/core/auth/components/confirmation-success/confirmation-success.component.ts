import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-success',
  templateUrl: './confirmation-success.component.html',
  styleUrl: './confirmation-success.component.scss',
  imports: [CommonModule],
})
export class ConfirmationSuccessComponent implements OnInit {
  userEmail: string = '';
  alreadyConfirmed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userEmail = params['email'] || '';
      this.alreadyConfirmed = params['already_confirmed'] === 'true';
    });
    console.log("User email: ", this.userEmail)
  }

  goToLogin() {
    this.router.navigate(['/']);
  }
}
