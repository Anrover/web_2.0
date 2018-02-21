import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/RestService.service'
import { SlicePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-payments',
  templateUrl: './list-payments.component.html',
  styleUrls: ['./list-payments.component.css'],
  providers: [RestService]
})
export class ListPaymentsComponent implements OnInit {

  model: any = {
    searchfield: "------",
    sortfield: "ID",
    comment: ""
  };

  data: any = {
    'header': [],
    'entries': []
  }

  entries: any = [];

  constructor(private router: Router, private restService: RestService) { }

  ngOnInit() {
    this.applyData();
  }

  applyData() {
    this.restService.getListPayments(this.model).subscribe(
      (data) => { 
        console.log(data);
        this.data = data;
      }, error => {
        this.router.navigate(['/login']);
      });
  }

  changeSafe(entry: any) {
    this.restService.patchSafeEntry(entry[0], !entry[entry.length-1]).subscribe(
      (response) => {
        console.log(response.status);
        if (response.status == 200) 
          entry[entry.length-1] = !entry[entry.length-1];
      }, error => {
        this.router.navigate(['/login']);
      });
  }
}
