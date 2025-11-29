import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgZone } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';

// Angular Material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-results',
  standalone: true,
  templateUrl: './results.html',
  styleUrls: ['./results.css'],
  imports: [CommonModule, MatProgressSpinnerModule, MatTableModule, MatToolbarModule, RouterModule]
})
export class ResultsComponent implements OnInit {
  employee: string = '';
  loading: boolean = true;

  displayedColumns: string[] = ['name', 'model'];
  deviceData: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.employee = params['employee'] || '';
    });

    // Simulate API call with delay — run inside NgZone to guarantee change detection
    setTimeout(() => {

      // Use ngZone.run to ensure change detection runs
      this.ngZone.run(() => {
        this.deviceData = [
          { name: 'Laptop 1', model: 'HP 840 G9' },
          { name: 'Monitor 2', model: 'HP 27f' }
        ];
        this.loading = false;

        // force detect changes immediately
          this.cdr.detectChanges();

      });
    }, 1500);
  }
}
