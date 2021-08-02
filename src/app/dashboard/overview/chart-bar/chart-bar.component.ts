import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.scss']
})
export class ChartBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    new Chart("myChartBar", {
      type: 'line',
      data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
              label: "Chiffre d'affaires",
              data: [12, 19, 3, 5, 2, 3],
              borderColor: 'RGB(91, 198, 198)',
              backgroundColor:'RGB(91, 198, 198)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
        }
    });
  }
}
