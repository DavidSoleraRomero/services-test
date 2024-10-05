import { Injectable } from '@angular/core';
import { DataService } from '../interfaces/data-service';
import { Person } from '../interfaces/person';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(
    private dataService: DataService<Person>,
  ) { }
  
  addPerson(person: Person): Observable<Person> {
    return this.dataService.create(person)
  }

  updatePerson(id: string, person: Person): Observable<Person | null> {
    return this.dataService.update(id, person);
  }

  deletePerson(id: string): Observable<Person | null> {
    return this.dataService.delete(id);
  }

  deleteFirstPerson() {
    return this.dataService.deleteFirst();
  }

  requestPersonById(id: string): Observable<Person | null> {
    return this.dataService.requestById(id);
  }
  
  requestAllPersons(): Observable<Person[]> {
    return this.dataService.requestAll();
  }

}
