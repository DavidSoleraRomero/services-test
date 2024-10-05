import { Component } from '@angular/core';
import { PeopleService } from '../core/services/people.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public peopleSvc: PeopleService,
  ) {}

  createPerson() {
    this.peopleSvc.addPerson({
      name: "David", 
      surnames: "Solera Romero", 
      age: 18
    }).subscribe({
      next: value => {
        console.log(value.name + " created");
      },
      error: error => {
        console.log(error);
      }
    })
  }
  
  deletePerson() {
    this.peopleSvc.deleteFirstPerson();
  }

}
