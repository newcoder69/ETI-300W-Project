import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule
  ]
})
export class HomepageComponent {
  employeeName: string = '';
  status: string = '';

  constructor(private router: Router) {}

  searchEmployee() {
    if (!this.employeeName.trim()) {
      this.status = 'Please enter an employee name';
      return;
    }
    this.status = 'Searching...';

    // Navigate to results page with query parameter
    this.router.navigate(['/results'], { queryParams: { employee: this.employeeName } });
  }
}
