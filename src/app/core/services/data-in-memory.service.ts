import { Injectable } from '@angular/core';
import { DataService } from '../interfaces/data-service';
import { Observable, of } from 'rxjs';
import { Model } from '../interfaces/model';

@Injectable({
  providedIn: 'root'
})
export class DataInMemoryService<T extends Model> extends DataService<T> {

  constructor() {
    super();
  }

  private generateAlfanumericCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 10; i++) 
      code += characters[Math.floor(Math.random() * characters.length)];
    return code;
  }
  

  public override create(element: T): Observable<T> {
    let id: string = this.generateAlfanumericCode();
    element.id = id;
    let nextData: T[] = [...this._data.getValue(), element];
    this._data.next(nextData);
    return new Observable((observer) => {
      observer.next(element);
      observer.complete();
    });
  }

  public override requestAll(): Observable<T[]> {
    return this.data$;
  }

  public override requestById(id: string): Observable<T | null> {
    let nextData: T[] = this._data.getValue();
    let index = nextData.findIndex(t => t.id == id);
    return (index >= 0) ? of(nextData[index]) : of(null);
  }

  public override update(id: string, element: T): Observable<T | null> {
    let nextData: T[] = this._data.getValue();
    let index = nextData.findIndex(t => t.id == id);
    if (index >= 0) 
      nextData.forEach((t, index) => {
        if (t.id == id) {
          nextData[index] = element;
          this._data.next(nextData);
        }
      });
    return (index >= 0) ? of(element) : of(null);
  }

  public override delete(id: string): Observable<T | null> {
    let nextData: T[] = this._data.getValue();
    let index = nextData.findIndex(t => t.id == id);
    nextData.splice(index, 1);
    this._data.next(nextData);
    return (index >= 0) ? of(nextData[index]) : of(null);
  }

}
