import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {
  event_id: number;
  description: string;
  start: string;
  end: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient){}
  url = 'http://127.0.0.1:5000';
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  ngOnInit(): void {
    //pegando id do evento enviado pelo path
    this.activatedRoute.paramMap
    .subscribe(params => {
      this.event_id = params.params.event_id;
    });

    this.http.get(this.url+'/get-event/'+this.event_id, { headers: new HttpHeaders({'api-key': this.currentUser.token})})
    .subscribe(data => {
      this.description = data.event.description;
      this.start = moment(data.event.start_time).format('MMMM Do YYYY, h:mm:ss a');
      this.end = moment(data.event.end_time).format('MMMM Do YYYY, h:mm:ss a');
    })
  }

  delete(){
    let reqDel = this.http.get(this.url+'/delete-event/'+this.event_id, { headers: new HttpHeaders({'api-key': this.currentUser.token})})
    .subscribe(data => {
      console.log(data)
      if (data.message == 'deleted'){
        this.router.navigate(['/events']);
      }
    })
  }

  handleEditClick(){
    this.router.navigate(['/editEvent/'+this.event_id]);
  }

}
