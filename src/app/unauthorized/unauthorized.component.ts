import { Component,OnInit  } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  template: ` <div class="d-flex justify-content-center align-items-center h-100">
  <div class="alert alert-danger text-center" role="alert">
    Access Denied! You are not authorized to view this page.
    <button (click)="goBack()" class="btn btn-secondary mt-3">Go Back</button>
  </div>
</div>`
})
export class UnauthorizedComponent {
  constructor() { }

  ngOnInit(): void {
  }

  goBack(): void {
    alert('Going back to previous page');
    window.history.back();
  }
  
}
