import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPagination } from './shared/models/pagination.model';
import { IProduct } from './shared/models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'my-$hop';

  products: IProduct[] = [];

  constructor() {}

  ngOnInit() {}
}
