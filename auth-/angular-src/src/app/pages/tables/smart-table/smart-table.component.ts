import { DataApiService } from './../../../services/data-api.service';
import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService } from '../../../@core/data/smart-table.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SmartTableComponent {


  settings = {
    columns: {
      rank: {
        title: 'rank',
        editable: false,
        addable: false,
      }
    }
  };

  source: LocalDataSource;
  apiData: any;

  constructor(private service: SmartTableService, private dataService:DataApiService) {
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
      this.apiData = res;
    })
  };

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
