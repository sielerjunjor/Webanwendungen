import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Project}from'../Project';

@Injectable({
  providedIn: 'root'
})




export class ApiService {

  readonly ROOT_URL = 'http://localhost:3000/projects'

  constructor(private http: HttpClient) { }

  getPosts(){

    return this.http.get(this.ROOT_URL)
  }
  getProjects(){
    return this.http.get<Array<Project>>(this.ROOT_URL, {responseType : 'json'})
  }
  postProjects(project:Project){
    return this.http.post(this.ROOT_URL,project,{responseType:'json'})
  }
}
