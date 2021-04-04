import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.gifs = JSON.parse(localStorage.getItem('gifs')!) || [];
    //   if (localStorage.getItem('history')) {
    //     // this._history = JSON.parse(localStorage.getItem('history')!);
    //   }
  }

  private apiKey: string = '7sxBwMEqBeYH4bwh3BIn1wIrm2yJDJ5T';
  private apiUrl: string = 'http://api.giphy.com/v1/gifs';
  private _history: string[] = [];

  //FIX:  Cambiar any por el tipo correspondiente
  public gifs: Gif[] = [];

  get history() {
    return [...this._history];
  }

  searchGifs(query: string) {
    query = query.trim().toLowerCase();
    if (query.trim().length === 0) return;
    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);

      localStorage.setItem('history', JSON.stringify(this._history));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this.apiUrl}/search`, { params })
      .subscribe((res: SearchGifsResponse) => {
        console.log(res.data);
        this.gifs = res.data;
        localStorage.setItem('gifs', JSON.stringify(this.gifs));
      });
  }
}
