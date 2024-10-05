import { Injectable } from '@angular/core';
import { DataService } from '../interfaces/data-service';
import { Observable } from 'rxjs';
import { Model } from '../interfaces/model';

@Injectable({
  providedIn: 'root'
})
export class DataInCookieService<T extends Model> extends DataService<T> {

  constructor() {
    super();
    let data: string | null = localStorage.getItem("data");
    if (data) {
      let storagedData: T[] = JSON.parse(data);
      this._data.next(storagedData);
    } 
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
    localStorage.setItem("data", JSON.stringify(nextData));
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
    return new Observable((observer) => {
      if (index >= 0) observer.next(nextData[index]);
      else observer.next(null);
      observer.complete();
    });
  }

  public override update(id: string, element: T): Observable<T | null> {
    let nextData: T[] = this._data.getValue();
    let index = nextData.findIndex(t => t.id == id);
    if (index >= 0) 
      nextData.forEach((t, index) => {
        if (t.id == id) {
          nextData[index] = element;
          this._data.next(nextData);
          localStorage.setItem("data", JSON.stringify(nextData));
        }
      });
    return new Observable((observer) => {
      observer.next(element);
      observer.complete();
    });
  }

  public override delete(id: string): Observable<T | null> {
    let nextData: T[] = this._data.getValue();
    let index = nextData.findIndex(t => t.id == id);
    let deletedData = null;
    if (index >= 0) {
      deletedData = nextData[index];
      nextData.splice(index, 1);
      this._data.next(nextData);
      localStorage.setItem("data", JSON.stringify(nextData));
    }
    return new Observable((observer) => {
      observer.next(deletedData);
      observer.complete();
    });
  }

  public override deleteFirst(): Observable<T | null> {
    let nextData: T[] = this._data.getValue();
    let firstData = nextData.shift();
    this._data.next(nextData);
    localStorage.setItem("data", JSON.stringify(nextData));
    return new Observable((observer) => {
      observer.next(firstData);
      observer.complete();
    });
  }

}
