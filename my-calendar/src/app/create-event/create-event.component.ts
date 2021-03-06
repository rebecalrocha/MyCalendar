import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  start_date: string; //tipo nativo
  end_date: string;
  error = null;
  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }
  
  url = 'http://127.0.0.1:5000';
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  ngOnInit() : void {
    this.activatedRoute.queryParamMap
      .subscribe((params: any) => {
         this.start_date = params.params.start_date;
         this.end_date = params.params.end_date;
      });
  }

  create(description, start_time, end_time){
    let start = moment(this.start_date + "T" + start_time).format("YYYY-MM-DDTHH:mm:SS");
    let end = moment(this.end_date + "T" + end_time).format("YYYY-MM-DDTHH:mm:SS");
    let body = {"description": description, "start_time": start, "end_time": end}

    this.http.post(this.url+'/events', body, { headers: new HttpHeaders({'api-key': this.currentUser.token})})
        .subscribe((data: any) => {
          if (data && data.error) {
            this.error = data.error          
          }
          this.router.navigate(['/events'])
        })
  }

}
