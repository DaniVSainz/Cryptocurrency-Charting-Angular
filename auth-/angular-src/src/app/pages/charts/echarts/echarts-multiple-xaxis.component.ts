import { ActivatedRoute } from '@angular/router';
import { DataApiService } from './../../../services/data-api.service';
import { Component, AfterViewInit, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-multiple-xaxis',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsMultipleXaxisComponent implements AfterViewInit, OnDestroy, OnInit {
  options: any = {};
  themeSubscription: any;
  days: any = [];
  priceData: any = [];
  dayData: any = [];

  constructor(
    private theme: NbThemeService,
    private dataApiService:DataApiService,
    private route: ActivatedRoute
    ) {
    }

  ngOnInit(){
    this.dataApiService.getPairData("BTC").subscribe(
      res=>{
        this.days = res;
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
  console.log('Setup #2 if in order we should be good ')
  console.log(this.priceData);

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
        data: [{name:"Bitcoin"}],
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
