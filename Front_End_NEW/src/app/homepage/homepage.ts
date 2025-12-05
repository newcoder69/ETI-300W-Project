import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClient } from '@angular/common/http';

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
    MatDividerModule,
    RouterModule,
  ]
})
export class HomepageComponent {
  employeeName: string = '';
  status: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  searchEmployee() {
    if (!this.employeeName.trim()) {
      this.status = 'Please enter an employee name';
      return;
    }


    this.status = 'Searching...';
    
   this.router.navigate(['/results'],{
            queryParams: { employee: this.employeeName}
          });



  }
}
