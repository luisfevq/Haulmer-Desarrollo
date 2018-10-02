import { Injectable } from '@angular/core';

// Apis
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../node_modules/rxjs';
import { NewsInterfaz } from '../model/new';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  configUrlTOP = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
  configUrlNew = 'https://hacker-news.firebaseio.com/v0/item/';
  configUrlComent = 'https://hacker-news.firebaseio.com/v0/item/';

  constructor(private http: HttpClient) { }

  getTop(){
    return this.http.get(this.configUrlTOP);
  }
  getNewById(_id:number){
    return this.http.get(this.configUrlNew + _id +'.json?print=pretty');
  }
  getComentarioById(_id:number){
    return this.http.get(this.configUrlComent + _id +'.json?print=pretty');    
  }
  comentarios(kid_id:number){
    return this.http.get(this.configUrlComent + kid_id +'.json?print=pretty');    
  }
}
