import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// Angular Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  employeeName: string = '';
  status: string = '';

  constructor(private http: HttpClient) {}

  searchEmployee() {
    const payload = { name: this.employeeName };

    this.http.post('http://SERVER2_PUBLIC_IP:3000/query', payload)
      .subscribe({
        next: (response) => {
          this.status = "Data retrieved successfully!";
          console.log('Response:', response);
          // You can store response to display on another page
        },
        error: (err) => {
          this.status = "Failed to retrieve data.";
          console.error(err);
        }
      });
  }
}
