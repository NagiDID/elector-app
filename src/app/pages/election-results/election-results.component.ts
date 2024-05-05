import { Component, ViewChild, signal } from "@angular/core";
import { CommonModule, NgFor} from "@angular/common";
import { resultados, tarjeton } from "../../models/tags.model";
import { ChartComponent, NgApexchartsModule } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any[];
};

@Component({
  selector: 'app-election-results',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule, NgFor],
  templateUrl: './election-results.component.html',
  styleUrl: './election-results.component.scss'
})
export class ElectionResultsComponent {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: ChartOptions;

  tarjetones = signal<tarjeton[]>([]);
  eventName = signal<string>('')

  ngOnInit(): void {

    const nombreDelEvento = localStorage.getItem("nombreDelEvento");
    if(nombreDelEvento) {
      this.eventName.set(nombreDelEvento)
    }

    console.log(typeof this.chartSeriesValues)

    const storedTarjetones = localStorage.getItem('tarjetones');
    if (storedTarjetones) {
      this.tarjetones.set(JSON.parse(storedTarjetones));
    }

  }

  showResultsAt(indexReceived: number) {
    const existingEntriesString = localStorage.getItem(`votedCandidates_${indexReceived}`);
    if (existingEntriesString) {
        let existingEntries: string[];
        try {
            existingEntries = JSON.parse(existingEntriesString);
            if (!Array.isArray(existingEntries)) {
                throw new Error('Not an array');
            }
        } catch (error) {
            console.error('Failed to parse existingEntries or not an array:', error);
            return;
        }

        const counts: { [key: string]: number } = {};

        existingEntries.forEach((entry: string) => {
            if (counts[entry]) {
                counts[entry] += 1;
            } else {
                counts[entry] = 1;
            }
        });

        this.resultados.set( Object.entries(counts).map(([candidateName, amountOfVotes]) => {
            console.log(`"${candidateName}" = ${amountOfVotes}`);
            return { candidateName, amountOfVotes };
        }));

        this.chartSeriesValues.set(this.resultados().map(res => res.amountOfVotes))
        this.chartLabelValues.set(this.resultados().map(res => res.candidateName))

    } else {
        console.log('No entries found for this index.');
    }
}

  resultados = signal<resultados[]>([])
  // cantidadVotos = this.resultados().map(res => res.amountOfVotes);
  // nombresVotantes = this.resultados().map(res => res.candidateName);
  chartSeriesValues = signal<number[]>([25, 25, 25, 25])
  chartLabelValues = signal<string[]>(["ganador", "puesto2", "puesto3", "puesto4"])


  constructor() {
    this.chartOptions = {
      series: [],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}