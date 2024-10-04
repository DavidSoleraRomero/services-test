import { Injectable } from '@angular/core';
import { DataService } from '../interfaces/data-service';
import { Person } from '../interfaces/person';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(
    private dataInMemoryService: DataService<Person>,
  ) { 
    this.dataInMemoryService.create({
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

    this.dataInMemoryService.create({
      name: "Adrián", 
      surnames: "Solera Romero", 
      age: 25
    }).subscribe({
      next: value => {
        console.log(value.name + " created");
      },
      error: error => {
        console.log(error);
      }
    })

    this.dataInMemoryService.create({
      name: "Ignacio", 
      surnames: "Lázaro Zambrano", 
      age: 19
    }).subscribe({
      next: value => {
        console.log(value.name + " created");
      },
      error: error => {
        console.log(error);
      }
    })
  }
  
  addPerson(person: Person): Observable<Person> {
    return this.dataInMemoryService.create(person)
  }

  updatePerson(id: string, person: Person): Observable<Person | null> {
    return this.dataInMemoryService.update(id, person);
  }

  deletePerson(id: string): Observable<Person | null> {
    return this.dataInMemoryService.delete(id);
  }

  requestPersonById(id: string): Observable<Person | null> {
    return this.dataInMemoryService.requestById(id);
  }
  
  requestAllPersons(): Observable<Person[]> {
    return this.dataInMemoryService.requestAll();
  }

}
