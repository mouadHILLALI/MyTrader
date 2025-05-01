import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Asset, Transaction, User } from '../../../types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoinService } from '../../../core/services/coin.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../app/store/selectors/user.selectors';
import { WebSocketService } from '../../../core/services/webSocket.service';
import type {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexFill,
  ApexGrid,
  ApexMarkers,
} from "ng-apexcharts"

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis?: ApexXAxis;  // Made optional with ?
  yaxis?: ApexYAxis;  // Made optional with ?
  dataLabels?: ApexDataLabels;
  grid?: ApexGrid;
  stroke?: ApexStroke;
  tooltip?: ApexTooltip;
  fill?: ApexFill;
  markers?: ApexMarkers;
};

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css' , './dashboard.component.scss'],
  standalone:false
})
export class UserDashboardComponent implements OnDestroy {
  @ViewChild("chart") chart!: ChartComponent
  public chartOptions!: Partial<ChartOptions>

  user$ : Observable<User| null>;
  totalBalance: number = 24586.40;
  totalProfit: number = 1245.23;
  profitPercentage: number = 5.3;
  showLaunchModal = false;
  token !: string | null;
  launchForm: FormGroup;
  private dataSubscription !: Subscription;
  dashData: any;
  public assets : any = []
  public selectedTimeframe = "24h"
  public timeframes = ["1h", "24h", "7d", "30d", "All"]

  private destroy$ = new Subject<void>()



  constructor(private fb: FormBuilder, private coinService : CoinService , private store:Store,
    private webSocketService : WebSocketService
  ) {
    this.launchForm = this.fb.group({
      name: ['', [Validators.required]],
      symbol: ['', [Validators.required, Validators.maxLength(5)]],
      price: ['', [Validators.required, Validators.min(1)]],
      supply: ['']
    });
    this.user$ = this.store.select(selectUser);
  }
  toggleLaunchModal(): void {
    this.showLaunchModal = !this.showLaunchModal;
    if (!this.showLaunchModal) {
      this.launchForm.reset({
        tokenType: 'ERC20',
        decimals: 18
      });
    }
  }
  
  submitLaunchForm(): void {
    if (this.launchForm.valid) {
      console.log('Form submitted:', this.launchForm.value);
      this.coinService.addCoin(this.launchForm.value).subscribe(
        (response) => {
          console.log('Coin added successfully:', response);
          this.toggleLaunchModal();
        },
        (error) => {
          console.error('Error adding coin:', error);
        }
      );
    } else {
      Object.keys(this.launchForm.controls).forEach((key) => {
        this.launchForm.get(key)?.markAsTouched();
      });
    }
  }
  

  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
       this.token = localStorage.getItem("token");
     this.webSocketService.connect(this.token);
     this.dataSubscription = this.webSocketService.dashData$.subscribe(data => {
      this.dashData = data;
      this.assets = this.dashData.coins
      console.log(this.assets);
      
      this.initChartOptions()
      this.simulateWebSocketUpdates()   
     });
     
    }
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
    this.webSocketService.disconnect();
    this.destroy$.next()
    this.destroy$.complete()
  }
  private initChartOptions(): void {
    // Generate initial chart data
    const chartData = this.generateTimeSeriesData(this.dashData.coins)

    this.chartOptions = {
      series: [
        {
          name: "Portfolio Value",
          data: chartData,
        },
      ],
      chart: {
        type: "area",
        height: 350,
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
          speed: 800,
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
        background: "#1f2937",
        foreColor: "#9ca3af",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
        colors: ["#3b82f6"],
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.2,
          stops: [0, 90, 100],
          colorStops: [
            {
              offset: 0,
              color: "#3b82f6",
              opacity: 0.4,
            },
            {
              offset: 100,
              color: "#3b82f6",
              opacity: 0,
            },
          ],
        },
      },
      grid: {
        borderColor: "#374151",
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      xaxis: {
        type: "datetime",
        labels: {
          style: {
            colors: "#9ca3af",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#9ca3af",
          },
          formatter: (value) => {
            return "$" + value.toLocaleString()
          },
        },
      },
      tooltip: {
        theme: "dark",
        x: {
          format: "dd MMM yyyy",
        },
        y: {
          formatter: (value) => {
            return "$" + value.toLocaleString()
          },
        },
      },
      markers: {
        size: 0,
        strokeWidth: 0,
        hover: {
          size: 5,
        },
      },
    }
  }

  private generateTimeSeriesData(coins: any[]): any[] {
    // For demo purposes, we'll generate time series data
    // In a real app, this would come from your WebSocket
    const now = new Date().getTime()
    const timeSeriesData = []

    // Calculate total portfolio value
    const totalValue = coins.reduce((sum, coin) => sum + coin.value, 0)

    // Generate data points for the last 30 danys
    for (let i = 30; i >= 0; i--) {
      const timestamp = now - i * 24 * 60 * 60 * 1000

      // Add some randomness to simulate price movements
      const randomFactor = 0.95 + Math.random() * 0.1 // 0.95 to 1.05
      const dayValue = Math.round(totalValue * randomFactor)

      timeSeriesData.push({
        x: timestamp,
        y: dayValue,
      })
    }

    return timeSeriesData
  }

  private simulateWebSocketUpdates(): void {
    // Simulate price updates every 3 seconds
    const interval = setInterval(() => {
      // Update coin prices with random movements
      this.dashData.coins = this.dashData.coins.map((coin:any) => {
        const changePercent = (Math.random() - 0.5) * 0.04 // -2% to +2%
        const newPrice = Math.max(coin.price * (1 + changePercent), 0.01)
        const newValue = coin.amount * newPrice

        return {
          ...coin,
          price: Number.parseFloat(newPrice.toFixed(2)),
          value: Number.parseFloat(newValue.toFixed(2)),
          change: Number.parseFloat((coin.change + changePercent * 100).toFixed(1)),
        }
      })

      // Update assets for the table
      this.assets = [...this.dashData.coins]

      // Update chart data
      this.updateChartData()
    }, 3000)

    // Clean up interval on component destroy
    this.destroy$.subscribe(() => {
      clearInterval(interval)
    })
  }

  private updateChartData(): void {
    const newData = this.generateTimeSeriesData(this.dashData.coins)

    if (this.chartOptions.series) {
      this.chartOptions.series = [
        {
          name: "Portfolio Value",
          data: newData,
        },
      ]
    }
  }

  public changeTimeframe(timeframe: string): void {
    this.selectedTimeframe = timeframe
    // In a real app, you would fetch data for the selected timeframe
    // For demo, we'll just update the chart with slightly different data

    // Adjust the data range based on timeframe
    let dataPoints = 30 // default for 30d

    switch (timeframe) {
      case "1h":
        dataPoints = 60 // 60 minutes
        break
      case "24h":
        dataPoints = 24 // 24 hours
        break
      case "7d":
        dataPoints = 7 // 7 days
        break
      case "All":
        dataPoints = 90 // 90 days
        break
    }

    // Generate new data with the appropriate number of points
    const now = new Date().getTime()
    const timeSeriesData = []

    // Calculate total portfolio value
    const totalValue = this.dashData.coins.reduce((sum:any, coin:any) => sum + coin.value, 0)

    for (let i = dataPoints; i >= 0; i--) {
      let timestamp
      let divisor

      // Adjust time increment based on timeframe
      if (timeframe === "1h") {
        divisor = 60 * 1000 // 1 minute
      } else if (timeframe === "24h") {
        divisor = 60 * 60 * 1000 // 1 hour
      } else {
        divisor = 24 * 60 * 60 * 1000 // 1 day
      }

      timestamp = now - i * divisor

      // Add some randomness to simulate price movements
      // More volatility for shorter timeframes
      let volatility = 0.05 // default
      if (timeframe === "1h") volatility = 0.02
      if (timeframe === "24h") volatility = 0.03
      if (timeframe === "All") volatility = 0.15

      const randomFactor = 1 - volatility / 2 + Math.random() * volatility
      const pointValue = Math.round(totalValue * randomFactor)

      timeSeriesData.push({
        x: timestamp,
        y: pointValue,
      })
    }

    // Update chart with new data
    if (this.chartOptions.series) {
      this.chartOptions.series = [
        {
          name: "Portfolio Value",
          data: timeSeriesData,
        },
      ]
    }
  }
}
 