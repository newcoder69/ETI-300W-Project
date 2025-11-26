import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // standalone component imports
  templateUrl: './app.html'
})
export class App {
  deviceId: string = '';
  status: string = '';
  responseData: any;

  constructor(private http: HttpClient) {}

  sendRequest() {
    const payload = { deviceId: this.deviceId };

    this.http.post('http://SERVER2_PUBLIC_IP:3000/query', payload)
      .subscribe({
        next: (response) => {
          this.status = "Received data successfully!";
          this.responseData = response;
        },
        error: (err) => {
          this.status = "Failed to retrieve data.";
          console.error(err);
        }
      });
  }
}
