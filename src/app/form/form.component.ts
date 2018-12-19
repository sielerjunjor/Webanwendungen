import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { StaticSymbolResolver } from '@angular/compiler';



var states;/*  = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']; */
  interface Project{
    uid;
    projektName;
    riskName;
    riskCriticality;
    riskProbability;
    riskMessure;
    description;
  }
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  
  
  public model: any;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  rows: Array<Project> = new Array;
  projects$: Object;
  constructor(private data: ApiService) { }

  ngOnInit() {
   this.data.getProjects().subscribe(
     (result: Array<Project>) => {
       console.log('success!', result);
       this.rows = result.slice(0);
     },
     (error: any) => {
       console.log("error",error)
     }


     
     )
   }
  ngAfterViewInit(){
    const test = this.rows;
    console.log(this.rows+ "arrayLength: "+this.rows.length);
    for (var i = 10; i < this.rows.length; i++) {
      console.log(this.rows[i]);
      states.add(this.rows[i]);
    }
  }

  }
