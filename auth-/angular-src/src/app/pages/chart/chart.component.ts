import { ActivatedRoute } from '@angular/router';
import { DataApiService } from '../../services/data-api.service';
import { Component, AfterViewInit, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';


@Component({
  selector: 'app-chart-component',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit, OnDestroy, OnInit {
  options: any = {};
  themeSubscription: any;
  days: any = [];
  priceData: any = [];
  dayData: any = [];
  symbol: String;
  pair: Object;

  constructor(
    private theme: NbThemeService,
    private dataApiService:DataApiService,
    private route: ActivatedRoute) 
    {
      // Grab our symbol from route ie: charts/btc =
      this.symbol = this.route.snapshot.params.symbol;
      console.log(`Symbol is: ${this.symbol}`);
  }

  ngOnInit(){
    console.log('First line constructor');
    // Get data from our api
    this.dataApiService.getPairData(this.symbol).subscribe(
      res=>{
        //Grab our pair and pair.days from response
        this.pair = res[0].pair
        this.days = res[1].days;
        //Iterate and create a array of days/price
        this.days.forEach(element => {
          this.dayData.push(element.date);
          this.priceData.push(element.openingPrice.replace(/,/g,""));
        });
        console.log('Setup Should be done #1')

        this.setChart();
      }, err =>{
        err = err.json();
        console.log(`ERROR : ${err}`);
      }
    );
  }

  ngAfterViewInit() {
  }

 setChart(){


  this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

    const colors: any = config.variables;
    const echarts: any = config.variables.echarts;



    this.options = {
      backgroundColor: echarts.bg,
      color: [colors.success, colors.info],
      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'cross',
        },
      },
      legend: {
        data: [{
          name: 'Bitcoin',
          // compulsorily set icon as a circle
          icon: 'circle',
          // set up the text in red
          textStyle: {
              color: 'black'
          }
      }],
        textStyle: {
          color: echarts.textColor,
        },
      },
      grid: {
        top: 70,
        bottom: 50,
      },
      xAxis: [
        {
          boundaryGap:false,
          type: 'category',
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: colors.success,
            },
          },
          axisLabel: {
            textStyle: {
              color: echarts.textColor,
            },
          },
          axisPointer: {
            label: this.dayData,
          },
          data: this.dayData,
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: echarts.axisLineColor,
            },
          },
          splitLine: {
            lineStyle: {
              color: echarts.splitLineColor,
            },
          },
          axisLabel: {
            textStyle: {
              color: echarts.textColor,
            },
          },
        },
      ],
      series: [
        {
          type: 'line',
          smooth: true,
          data:this.priceData,
        },
      ],
    };
  });
 }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
