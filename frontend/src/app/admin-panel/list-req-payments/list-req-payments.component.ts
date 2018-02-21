import { Component, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { RestService } from '../../services/RestService.service'

@Component({
  selector: 'app-list-req-payments',
  templateUrl: './list-req-payments.component.html',
  styleUrls: ['./list-req-payments.component.css'],
  providers: [RestService]
})
export class ListReqPaymentsComponent implements OnInit {

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

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.applyData();
  }

  applyData() {
    this.restService.getListReqPayments(this.model).subscribe(
      (data) => { 
        console.log(data);
        this.data = data;
      }
    );
  }
}
