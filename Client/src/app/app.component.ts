import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPagination } from './models/pagination.model';
import { IProduct } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'my-$hop';

  products: IProduct[] = [];

  constructor(private httpService: HttpClient) {}

  ngOnInit() {
    this.httpService
      .get('https://localhost:5001/api/products?pageSize=50')
      .subscribe({
        next: (res:any) => this.products = res.data,
        error: err => console.log(err)
     });
  }
}
