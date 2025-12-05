import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgZone } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import {Chart} from 'chart.js/auto';


// Angular Material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-results',
  standalone: true,
  templateUrl: './results.html',
  styleUrls: ['./results.css'],
  imports: [CommonModule, MatProgressSpinnerModule, MatTableModule, MatToolbarModule, RouterModule, FormsModule]
})

export class ResultsComponent implements OnInit, AfterViewInit {
  employee: string = '';
  apiData: any = null;
  statusMessage = '';
  loading: boolean = true;

  cpuChart?: Chart;
  diskChart?: Chart;
  ramChart?: Chart;
  freqChart?: Chart;

  cpuUsage = 0;
  CPUFreq = 0;
  ramUsage = 0;
  freeSpace = 0;
  totalSpace = 30;
  usedSpace = 0;
  ramUsageGB = 0;

  displayedColumns: string[] = ['name', 'CPU Usage', 'CPU Freuency (MHz)','Ram Usage', 'Free Space'];
  deviceData: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private router:Router,
    private http: HttpClient
  ) {}


  ngOnInit() {
    
    this.route.queryParams.subscribe(params =>{
      this.employee = params['employee'] || '';

      if(!this.employee){
        this.statusMessage = 'No employee specified. Return to homepage';
        this.loading = false;
        return;
      }
      this.statusMessage = 'loading data...';

      this.http.post<any>('http://127.0.0.1:3000', {message:this.employee})
      .subscribe({
        next: (data) => {
          console.log('results api data:', data);
          this.apiData = data;
          this.extractMetrics();
          this.statusMessage = 'Data Received!';
          this.loading = false
           
        },
        error: (err) => {
          console.error('Error fetching datain results:', err);
          this.statusMessage = 'Error fetching data';
          this.loading = false;
        }
        
      });
     
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
  
  ngAfterViewInit() {
    this.createCharts();
  }
createCharts(){
  this.cpuChart = new Chart('cpuChart',{
    type: 'bar',
    data: {
      labels: ['CPU Usage (%)'],
      datasets: [
        {
          label: 'CPU Usage',
          data:[this.cpuUsage],
          backgroundColor: 'rgba(54,162,235,0.6)',
        },
      ],
    },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
      x: {
        beginAtZero: true,
        max: 15,
      }
    },
  },
  });


  this.diskChart = new Chart('discChart', {
    type: 'doughnut',
    data: {
      labels: ['Free Space (GB),', 'Used Space (GB)'],
      datasets: [
        {
          data: [this.totalSpace,this.usedSpace],
          backgroundColor: [
            'rgba(75,192,192,0.7)',
            'rgba(255,99,132,0.7)',
          ],
        },
      ],
    },
    options: {
      cutout: '50%',
      responsive: true,
    },
  });

  this.ramChart = new Chart('ramChart',{
    type: 'bar',
    data: {
      labels: ['Ram Usage (GB)'],
      datasets: [
        {
          data: [this.ramUsage],
          label: 'ram usage',
          backgroundColor: 
            'rgba(255,99,132,0.7)',
        },
      ],
    },
    options:{
      responsive: true,
      scales:{
        y: {
          beginAtZero: true,
          max: 8
        },
      },
    },
  });
 this.freqChart = new Chart('freqChart',{
    type: 'bar',
    data: {
      labels: ['CPU Frequency (Mhz)'],
      datasets: [
        {
          data: [this.CPUFreq],
          label: 'CPU Frequency',
          backgroundColor: 
            '(0,0,0,0)',
        },
      ],
    },
    options:{
      responsive: true,
      scales:{
        y: {
          beginAtZero: true,
          max: 4000
        },
      },
    },
  });

}
updateCharts(){
  if(this.cpuChart){
    this.cpuChart.data.datasets[0].data[0] = this.cpuUsage
    this.cpuChart.update();
  }
  if (this.diskChart){
    this.diskChart.data.datasets[0].data = [this.freeSpace, this.usedSpace]
    this.diskChart.update();
  }
  if(this.ramChart){
    this.ramChart.data.datasets[0].data[0] = this.ramUsage;
    this.ramChart?.update();
  }
   if(this.freqChart){
    this.freqChart.data.datasets[0].data[0] = this.CPUFreq;
    this.freqChart?.update();
  }
}
  extractMetrics(){
    const data = this.apiData.Item.userData

    this.cpuUsage = Number(data.cpuUsage ?? 0);
    this.CPUFreq = Number(data.CPUFreq ?? 0);
    this.ramUsage = Number(data.ramUsage ?? 0);
    this.freeSpace = Number(data.freeSpace ?? 0)
   
    
    this.usedSpace = (this.totalSpace - this.freeSpace)
    console.log('metrics:',{
      cpuUsage: this.cpuUsage,
      ramUsage: this.ramUsage,
      CPUFreq: this.CPUFreq,
      
    })
    this.updateCharts();

  }
}
