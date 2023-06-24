import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private apiDataCache: { [key: string]: any } = {};

  constructor(private http: HttpClient) {}

  fetchData(option: string): Observable<any> {
    const cachedData = this.getFromLocalStorage(option);
    if (cachedData) {
      return of(cachedData);
    } else {
      let apiUrl = `https://fakestoreapi.com/products/category/${option}`;  
      return this.http.get<any>(apiUrl).pipe(
        tap((response) => {
          this.apiDataCache[option] = response;
          this.saveToLocalStorage(option, response);
        }),
        catchError((error) => {
          console.error('Error fetching data from API:', error);
          return of(null);
        })
      );
    }
  }

  private saveToLocalStorage(key: string, data: any): void {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (error) {
      console.error('Error saving data to local storage:', error);
    }
  }

  private getFromLocalStorage(key: string): any {
    try {
      const serializedData = localStorage.getItem(key);
      if (serializedData) {
        return JSON.parse(serializedData);
      }
    } catch (error) {
      console.error('Error retrieving data from local storage:', error);
    }
    return null;
  }
}
