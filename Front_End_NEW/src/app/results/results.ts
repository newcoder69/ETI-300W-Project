import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

// Angular Material modules
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

@Component({
  standalone: true,
  selector: 'app-results',
  templateUrl: './results.html',
  styleUrls: ['./results.css'],
  imports: [CommonModule, MatProgressSpinnerModule, MatTableModule]
})
export class ResultsComponent implements OnInit {
  employee = '';
  loading = true;

  deviceData: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Get the query param from homepage
    this.route.queryParams.subscribe(params => {
      this.employee = params['employee'] || '';
    });

    // Simulate loading delay
    setTimeout(() => {
      this.deviceData = [
        { name: 'Laptop 1', model: 'HP 840 G9' },
        { name: 'Phone 1', model: 'HP Elite x3' }
      ];
      this.loading = false;
    }, 1500);
  }
}
