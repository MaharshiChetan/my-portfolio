import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MessageService {

  domain = "http://localhost:3000";

  constructor(
    private http: Http
  ) { }

  sendMessage(sender) {
    return this.http.post(this.domain + '/send', sender).map(res => res.json());
  }
}
