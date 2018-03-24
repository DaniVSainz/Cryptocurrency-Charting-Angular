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
  reversedArray: any = [];
  currentDays: any= [];
  currentPrices: any= [];
  currentTimeRange: String = 'All Time';

  constructor(
    private theme: NbThemeService,
    private dataApiService:DataApiService,
    private route: ActivatedRoute) 
    {
      // Grab our symbol from route ie: charts/btc =
      this.symbol = this.route.snapshot.params.symbol;
  }

  ngOnInit(){
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
        // Calls our functions that constructs are chart, doing it this way to ensure our data is finished processing.
        this.setChart(this.dayData,this.priceData);
        
      }, err =>{
        err = err.json();
        console.log(`ERROR : ${err}`);
      }
    );
  }

  ngAfterViewInit() {
  }



  change30Days(){
    this.currentTimeRange = '30 Days'
    this.currentDays =  [];
    this.currentPrices =  [] ;
    for (let i = 1; i < 31; i++) {
      let day = this.days[this.days.length - i ];
      this.currentDays.push(day.date);
      this.currentPrices.push(day.openingPrice.replace(/,/g,"")); 
    }
    this.setChart(this.currentDays.reverse(),this.currentPrices.reverse());
    // this.setChart(this.currentDays,this.currentPrices);
  }

  change90Days(){
    this.currentTimeRange = '90 Days'
    this.currentDays =  [];
    this.currentPrices =  [] ;
    for (let i = 1; i < 91; i++) {
      let day = this.days[this.days.length - i ];
      this.currentDays.push(day.date);
      this.currentPrices.push(day.openingPrice.replace(/,/g,"")); 
    }
    this.setChart(this.currentDays.reverse(),this.currentPrices.reverse());
    // this.setChart(this.currentDays,this.currentPrices);
  }

  change365Days(){
    this.currentTimeRange = '1 Year'
    this.currentDays =  [];
    this.currentPrices =  [] ;
    for (let i = 1; i < 365; i++) {
      let day = this.days[this.days.length - i ];
      this.currentDays.push(day.date);
      this.currentPrices.push(day.openingPrice.replace(/,/g,"")); 
    }
    this.setChart(this.currentDays.reverse(),this.currentPrices.reverse());
    // this.setChart(this.currentDays,this.currentPrices);
  }

  changeAllDays(){
    this.currentTimeRange = 'All Time'
    console.log(this.dayData);
    this.setChart(this.dayData,this.priceData);
    // this.setChart(this.currentDays,this.currentPrices);
  }




 setChart(dayData,priceData){
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
      title: {
        text: 'Bitcoin'
      },
      // legend: {
      //   data: [{
      //     name: 'Bitcoin',
      //     // compulsorily set icon as a circle
      //     icon: 'circle',
      //     // set up the text in red
      //     textStyle: {
      //         color: 'black'
      //     }
      // }],
      //   textStyle: {
      //     color: echarts.textColor,
      //   },
      // },
      // grid: {
      //   top: 70,
      //   bottom: 50,
      // },
      dataZoom: [
        {
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'filter'
        },
        {
            id: 'dataZoomY',
            type: 'slider',
            yAxisIndex: [0],
            filterMode: 'empty'
        }
    ],
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
            label: {formatter: params => {
              return (
                params.value + (params.seriesData.length ? ' ：Price $' + params.seriesData[0].data : '')
              );
            }},
          },
          data: dayData,
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
          data:priceData,
        },
      ],
    };
  });
 }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
