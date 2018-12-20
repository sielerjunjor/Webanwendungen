import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { StaticSymbolResolver } from '@angular/compiler';
import {Project}from'src/Project';


var states:String[]  = []; 

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  postProj(){
    var description = document.getElementById("descriptionText").textContent;
    var projectNametest = document.getElementById("typeahead");
    var projectName = projectNametest.getAttribute("ng-reflect-model");
    var riskName = document.getElementById("riskName").textContent;
    var probability = document.getElementById("probability").focus;

    var project:Project = new Project();
    project.projectName=projectName;
    project.description=description;
    project.riskName=riskName;
    console.log(this.data.postProjects(project));
    console.log(project);
  }
  
  search = (text$: Observable<string>) =>
       text$.pipe(
         debounceTime(200),
         distinctUntilChanged(),
         map(term => term.length < 2 ? []
           : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
       )
  
  
  rows: Array<Project> = new Array;
  constructor(private data: ApiService) { }

  ngOnInit() {
   this.data.getProjects().subscribe(
     (result: Array<Project>) => {
       console.log('success!', result);
       this.rows = result.slice(0);
       console.log(this.rows);
       
       console.log("arrayLength: "+this.rows.length);
       for (var i = 0; i < this.rows.length; i++) {
         console.log(this.rows[i].projectName);
         states.push(this.rows[i].projectName);
       }



       


     },
     (error: any) => {
       console.log("error",error)
     }


     
     )
   }


}
