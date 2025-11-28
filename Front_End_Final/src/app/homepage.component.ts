import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
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
  employeeName = '';
  status = '';

  constructor(private http: HttpClient) {}

  searchEmployee() {
    const payload = { name: this.employeeName };

    this.http.post('http://SERVER2_PUBLIC_IP:3000/query', payload)
      .subscribe({
        next: () => this.status = "Data retrieved successfully!",
        error: () => this.status = "Failed to retrieve data."
      });
  }
}
