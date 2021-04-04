import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private gifsService: GifsService) {}

  ngOnInit(): void {}

  @ViewChild('txtBuscar') public txtBuscar!: ElementRef<HTMLInputElement>;

  public buscar(): void {
    const value: string = this.txtBuscar.nativeElement.value;

    this.gifsService.searchGifs(value);
  }

  public cleanInput(event: FocusEvent): void {
    this.txtBuscar.nativeElement.value = '';
  }
}
