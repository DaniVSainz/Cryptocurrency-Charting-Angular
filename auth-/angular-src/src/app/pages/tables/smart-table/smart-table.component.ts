import { Router } from '@angular/router';
import { DataApiService } from './../../../services/data-api.service';
import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService } from '../../../@core/data/smart-table.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss']
})
export class SmartTableComponent {


  settings = {
    columns: {
      rank: {
        title: 'rank',
        type: "html",
        sort: true,
        sortDirection: 'asc'
      },
      name: {
        title: 'name',
        type: 'html',
        valuePrepareFunction: (value) => { return `<span><img src="assets/images/coins/${value}.png" />${value}<span>` }
      },
      price_usd:{
        title:'price',
        valuePrepareFunction: (value) => { return `$${value}` }
      },
      percent_change_24h:{
        title:'24H',
        type: 'html',
        valuePrepareFunction: (value) => { 
          let negative = false;
          if(value.charAt(0) === '-'){
            return `<span class="red-cell">${value}</span>`;
          }else{
            return `<p class="green-cell">+${value}</p>` ;
          }
         }

      }
    },
    actions: {
      edit:false,
      delete:false,
      add:false,
    },pager: {
      perPage: 25
    }
  };

  source: LocalDataSource;
  lastUpdated: String;

  constructor(private service: SmartTableService, private dataService:DataApiService, private router:Router) {
    // this.getData();
    // console.log('tables page');
    // const data = this.service.getData();
    this.source = new LocalDataSource();

    this.dataService.top100().subscribe(res=>{
      this.source.load(res);
    })
  }

  getData(){
    this.dataService.top100().subscribe(res=>{

    })
  };

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onUserRowSelect(event): void {
    console.log(event.data);
    console.log(event.data.symbol)
    this.router.navigate([`pages/chart/${event.data.symbol}`]);
  }
}
