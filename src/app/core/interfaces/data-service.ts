import { BehaviorSubject, Observable } from "rxjs";
import { Model } from "./model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export abstract class DataService<T extends Model> {
    protected _data: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
    public data$: Observable<T[]> = this._data.asObservable();
    public abstract create(element: T): Observable<T>;
    public abstract requestAll(): Observable<T[]>;
    public abstract requestById(id: string): Observable<T | null>;
    public abstract update(id: string, element: T): Observable<T | null>;
    public abstract delete(id: string): Observable<T | null>;
    public abstract deleteFirst(): Observable<T | null>;
}